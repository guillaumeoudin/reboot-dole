import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

/**
 * OAuth proxy pour Decap CMS.
 * GET /api/auth → redirige vers GitHub pour autorisation.
 * Variables d'environnement requises : GITHUB_CLIENT_ID
 */
export const Route = createFileRoute("/api/auth")({
  server: {
    handlers: {
      GET: async () => {
        const params = new URLSearchParams({
          client_id: process.env.GITHUB_CLIENT_ID!,
          scope: "repo,user",
          redirect_uri: "https://reboot-dole.fr/api/auth/callback",
        });
        return new Response(null, {
          status: 302,
          headers: {
            Location: `https://github.com/login/oauth/authorize?${params}`,
          },
        });
      },
    },
  },
});
