import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

/**
 * Webhook WhatsApp Business Cloud API — assistant virtuel Reboot Dole.
 *
 * Flow :
 *  GET  /api/whatsapp → vérification du webhook par Meta (challenge)
 *  POST /api/whatsapp → message entrant → appel Claude Haiku → réponse WhatsApp
 *
 * Variables d'environnement requises (Vercel) :
 *  - WHATSAPP_TOKEN         : token d'accès Meta permanent (System User)
 *  - WHATSAPP_VERIFY_TOKEN  : chaîne arbitraire choisie lors de la config Meta
 *  - ANTHROPIC_API_KEY      : clé API Anthropic
 *  - REBOOT_SYSTEM_PROMPT   : base de connaissances du centre (voir guide déploiement)
 */

export const Route = createFileRoute("/api/whatsapp")({
  server: {
    handlers: {
      /**
       * Vérification du webhook — Meta appelle cette URL en GET lors de la configuration.
       * Si le verify_token correspond, on renvoie le challenge.
       */
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const mode = url.searchParams.get("hub.mode");
        const token = url.searchParams.get("hub.verify_token");
        const challenge = url.searchParams.get("hub.challenge");

        if (
          mode === "subscribe" &&
          token === process.env.WHATSAPP_VERIFY_TOKEN
        ) {
          return new Response(challenge, { status: 200 });
        }

        return new Response("Forbidden", { status: 403 });
      },

      /**
       * Réception d'un message entrant et réponse via Claude Haiku.
       */
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response("Bad Request", { status: 400 });
        }

        // Extraction du message texte entrant
        const entry = (body as Record<string, unknown>)?.entry as
          | unknown[]
          | undefined;
        const change = (entry?.[0] as Record<string, unknown>)?.changes as
          | unknown[]
          | undefined;
        const value = (change?.[0] as Record<string, unknown>)?.value as
          | Record<string, unknown>
          | undefined;
        const messages = value?.messages as unknown[] | undefined;
        const message = messages?.[0] as Record<string, unknown> | undefined;

        // Ignorer les messages non textuels (images, audio, etc.)
        if (!message || message.type !== "text") {
          return new Response("OK", { status: 200 });
        }

        const userText = (message.text as Record<string, unknown>)?.body as
          | string
          | undefined;
        const from = message.from as string | undefined;
        const phoneNumberId = (value?.metadata as Record<string, unknown>)
          ?.phone_number_id as string | undefined;

        if (!userText || !from || !phoneNumberId) {
          return new Response("OK", { status: 200 });
        }

        // Appel à Claude Haiku
        let reply: string;
        try {
          const claudeRes = await fetch(
            "https://api.anthropic.com/v1/messages",
            {
              method: "POST",
              headers: {
                "x-api-key": process.env.ANTHROPIC_API_KEY!,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
              },
              body: JSON.stringify({
                model: "claude-haiku-4-5-20251001",
                max_tokens: 350,
                system: process.env.REBOOT_SYSTEM_PROMPT,
                messages: [{ role: "user", content: userText }],
              }),
            }
          );

          if (!claudeRes.ok) {
            throw new Error(`Claude API error: ${claudeRes.status}`);
          }

          const claudeData = (await claudeRes.json()) as {
            content: { type: string; text: string }[];
          };
          reply = claudeData.content[0]?.text ?? "Je n'ai pas pu générer une réponse.";
        } catch (err) {
          console.error("[WhatsApp webhook] Claude error:", err);
          reply =
            "Bonjour ! Je rencontre un problème technique momentané. N'hésitez pas à nous appeler au 06 77 59 24 50 ou à prendre rendez-vous sur Planity. À très bientôt !";
        }

        // Envoi de la réponse via WhatsApp Cloud API
        try {
          const waRes = await fetch(
            `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                messaging_product: "whatsapp",
                to: from,
                type: "text",
                text: { body: reply },
              }),
            }
          );

          if (!waRes.ok) {
            const errBody = await waRes.text();
            console.error("[WhatsApp webhook] WhatsApp send error:", errBody);
          }
        } catch (err) {
          console.error("[WhatsApp webhook] fetch error:", err);
        }

        // Toujours renvoyer 200 à Meta pour éviter les retentatives
        return new Response("OK", { status: 200 });
      },
    },
  },
});
