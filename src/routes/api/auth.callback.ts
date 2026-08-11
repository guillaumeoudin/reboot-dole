import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

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
          return new Response(
            `<h3>Token exchange failed</h3><pre>${JSON.stringify(data, null, 2)}</pre>`,
            { status: 500, headers: { "Content-Type": "text/html" } },
          );
        }

        const token = data.access_token;
        // Use raw token format (no JSON wrapper) — tested against Decap CMS 3.x
        const message = `authorization:github:success:${token}`;

        return new Response(
          `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="font-family:monospace;padding:20px;background:#1a1a1a;color:#eee">
<h3 style="color:#7fff7f">OAuth Callback Debug</h3>
<p><b>URL:</b> <span id="u"></span></p>
<p><b>window.opener:</b> <span id="o"></span></p>
<p><b>Message (60c):</b> <span id="m"></span></p>
<p><b>Status:</b> <span id="s" style="color:yellow">...</span></p>
<p style="color:#888">Fermeture dans <span id="t">10</span>s</p>
<script>
document.getElementById('u').textContent = window.location.href;
document.getElementById('o').textContent = window.opener ? 'OK (not null)' : 'NULL';
var msg = ${JSON.stringify(message)};
document.getElementById('m').textContent = msg.substring(0, 60) + '...';
try {
  if (!window.opener) throw new Error('window.opener is null');
  window.opener.postMessage(msg, '*');
  document.getElementById('s').textContent = 'postMessage envoyé (format: token brut)';
  document.getElementById('s').style.color = '#7fff7f';
} catch(e) {
  document.getElementById('s').textContent = 'ERREUR: ' + e.message;
  document.getElementById('s').style.color = '#ff7f7f';
}
var n = 10;
var iv = setInterval(function(){
  n--; document.getElementById('t').textContent = n;
  if(n <= 0){ clearInterval(iv); window.close(); }
}, 1000);
</script>
</body></html>`,
          { headers: { "Content-Type": "text/html; charset=utf-8" } },
        );
      },
    },
  },
});
