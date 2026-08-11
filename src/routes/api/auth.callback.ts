import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

/**
 * OAuth proxy pour Decap CMS.
 * GET /api/auth/callback → échange le code GitHub contre un token
 * et le renvoie à Decap CMS via postMessage.
 * Variables d'environnement requises : GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
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
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID!,
            client_secret: process.env.GITHUB_CLIENT_SECRET!,
            code,
          }),
        });

        const { access_token } = (await tokenRes.json()) as { access_token: string };

        if (!access_token) {
          return new Response("OAuth token exchange failed", { status: 500 });
        }

        const payload = JSON.stringify({ token: access_token, provider: "github" });

        return new Response(
          `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8" /></head>
<body>
<script>
  window.opener.postMessage('authorization:github:success:${payload}', '*')
  window.close()
</script>
</body></html>`,
          { headers: { "Content-Type": "text/html; charset=utf-8" } },
        );
      },
    },
  },
});
