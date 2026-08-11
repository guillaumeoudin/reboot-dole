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
        // Decap CMS 3.x expects JSON — it does JSON.parse on the last segment of the message
        const payload = JSON.stringify({ token, provider: "github" });

        return new Response(
          `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="font-family:monospace;padding:20px;background:#1a1a1a;color:#eee">
<h3 style="color:#7fff7f">OAuth Callback</h3>
<p><b>Status:</b> <span id="s" style="color:yellow">Handshake...</span></p>
<ul id="log" style="color:#aaa;font-size:12px"></ul>
<p style="color:#888">Fermeture dans <span id="t">20</span>s</p>
<script>
(function(){
  var payload = ${JSON.stringify(payload)};
  var sent = false;

  function log(msg) {
    var li = document.createElement('li');
    li.textContent = new Date().toISOString().substr(11,8) + ' ' + msg;
    document.getElementById('log').appendChild(li);
  }

  function sendToken(targetOrigin) {
    if (sent) return;
    sent = true;
    var msg = 'authorization:github:success:' + payload;
    try {
      window.opener.postMessage(msg, targetOrigin);
      log('Token JSON envoyé à ' + targetOrigin);
      document.getElementById('s').textContent = 'Token envoyé ✓';
      document.getElementById('s').style.color = '#7fff7f';
    } catch(e) {
      log('ERREUR: ' + e.message);
    }
    setTimeout(function(){ window.close(); }, 2000);
  }

  window.addEventListener('message', function(e) {
    log('Ack reçu: ' + e.origin);
    // 500ms delay — lets Decap CMS register its token listener after the handshake ack
    setTimeout(function(){ sendToken(e.origin); }, 500);
  }, false);

  try {
    window.opener.postMessage('authorizing:github', '*');
    log('Handshake envoyé');
  } catch(e) {
    log('ERREUR handshake: ' + e.message);
  }

  setTimeout(function(){
    if (!sent) { log('Fallback direct'); sendToken('*'); }
  }, 5000);

  var n = 20;
  var iv = setInterval(function(){
    n--; document.getElementById('t').textContent = n;
    if(n <= 0){ clearInterval(iv); window.close(); }
  }, 1000);
})();
</script>
</body></html>`,
          { headers: { "Content-Type": "text/html; charset=utf-8" } },
        );
      },
    },
  },
});
