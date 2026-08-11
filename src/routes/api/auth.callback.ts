import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

/**
 * OAuth callback pour Decap CMS (GitHub backend).
 *
 * Flow :
 *  1. Decap CMS ouvre /api/auth dans un popup → redirect vers GitHub
 *  2. GitHub redirige ici avec ?code=xxx
 *  3. On échange le code contre un access_token
 *  4. On envoie le token à la fenêtre parente via postMessage (protocole handshake Decap CMS)
 *
 * Notes :
 *  - Decap CMS 3.x attend JSON.parse-able dans le dernier segment du message
 *  - Le handshake (authorizing:github → ack → token) est requis ; le délai de 500 ms
 *    évite une race condition où le token listener n'est pas encore enregistré
 */
export const Route = createFileRoute("/api/auth/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");

        if (!code) {
          return new Response("Missing OAuth code", { status: 400 });
        }

        const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID!,
            client_secret: process.env.GITHUB_CLIENT_SECRET!,
            code,
          }),
        });

        const data = (await tokenRes.json()) as { access_token?: string; error?: string };

        if (!data.access_token) {
          return new Response("OAuth authentication failed", { status: 500 });
        }

        const payload = JSON.stringify({ token: data.access_token, provider: "github" });

        return new Response(
          `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body>
<script>
(function(){
  var payload = ${JSON.stringify(payload)};
  var sent = false;
  function sendToken(origin) {
    if (sent) return;
    sent = true;
    window.opener.postMessage('authorization:github:success:' + payload, origin);
    setTimeout(function(){ window.close(); }, 500);
  }
  // Handshake : Decap CMS envoie un ack, on attend 500ms puis on envoie le token
  window.addEventListener('message', function(e) {
    setTimeout(function(){ sendToken(e.origin); }, 500);
  }, false);
  window.opener.postMessage('authorizing:github', '*');
  // Fallback au cas où Decap CMS ne répond pas au handshake
  setTimeout(function(){ if (!sent) { sendToken('*'); } }, 5000);
})();
</script>
</body></html>`,
          { headers: { "Content-Type": "text/html; charset=utf-8" } },
        );
      },
    },
  },
});
