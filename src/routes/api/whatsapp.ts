import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { Redis } from "@upstash/redis";
import { createSign } from "crypto";
import systemPrompt from "./whatsapp-system-prompt.txt?raw";

/**
 * Webhook WhatsApp Business Cloud API — assistant virtuel Reboot Dole.
 *
 * Flow :
 *  GET  /api/whatsapp → vérification du webhook par Meta (challenge)
 *  POST /api/whatsapp → message entrant → contexte session → Claude Haiku → réponse WhatsApp + log Sheets
 *
 * Variables d'environnement requises (Vercel) :
 *  - WHATSAPP_TOKEN              : token d'accès Meta permanent (System User)
 *  - WHATSAPP_VERIFY_TOKEN       : chaîne arbitraire choisie lors de la config Meta
 *  - ANTHROPIC_API_KEY           : clé API Anthropic
 *  - GOOGLE_SERVICE_ACCOUNT_EMAIL: email du service account Google
 *  - GOOGLE_SERVICE_ACCOUNT_KEY  : clé privée PEM (retours à la ligne en \n)
 *  - GOOGLE_SHEET_ID             : ID du Google Sheet de logging
 *
 * Variables injectées automatiquement par Vercel KV :
 *  - KV_REST_API_URL, KV_REST_API_TOKEN (+ variantes)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Message = { role: "user" | "assistant"; content: string };
type Session = { sessionId: string; messages: Message[] };

// ---------------------------------------------------------------------------
// Session memory — Vercel KV (Redis)
// 5 échanges max (10 messages) · TTL 24h (fenêtre WhatsApp)
// ---------------------------------------------------------------------------

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const HISTORY_KEY = (phone: string) => `chat:${phone}`;
const MAX_MESSAGES = 10; // 5 exchanges
const SESSION_TTL = 86400; // 24h in seconds

function generateSessionId(phone: string): string {
  const now = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).replace(",", "").replace(":", "h");
  return `****${phone.slice(-4)}_${now}`;
}

async function getSession(phone: string): Promise<Session> {
  try {
    return (await redis.get<Session>(HISTORY_KEY(phone))) ?? {
      sessionId: generateSessionId(phone),
      messages: [],
    };
  } catch {
    return { sessionId: generateSessionId(phone), messages: [] };
  }
}

async function saveSession(phone: string, session: Session): Promise<void> {
  try {
    await redis.set(
      HISTORY_KEY(phone),
      { ...session, messages: session.messages.slice(-MAX_MESSAGES) },
      { ex: SESSION_TTL }
    );
  } catch (err) {
    console.error("[WhatsApp webhook] KV write error:", err);
  }
}

// ---------------------------------------------------------------------------
// Google Sheets logging
// Auth via service account JWT (RS256) — aucune dépendance externe
// ---------------------------------------------------------------------------

function toBase64Url(data: string | Buffer): string {
  const buf = typeof data === "string" ? Buffer.from(data) : data;
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function getGoogleAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!.replace(
    /\\n/g,
    "\n"
  );
  const now = Math.floor(Date.now() / 1000);

  const header = toBase64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = toBase64Url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  );

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${payload}`);
  const jwt = `${header}.${payload}.${toBase64Url(signer.sign(privateKey))}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/**
 * Ajoute une ligne dans le Google Sheet de logs.
 * Colonnes : Session ID | Timestamp | User (anonymisé) | Question | Réponse du bot
 */
async function logToSheets(
  sessionId: string,
  phone: string,
  userMessage: string,
  botReply: string
): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) return;

  try {
    const token = await getGoogleAccessToken();
    const timestamp = new Date().toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
    });
    const userId = `****${phone.slice(-4)}`;

    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/echanges-bot!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[sessionId, timestamp, userId, userMessage, botReply]],
        }),
      }
    );
  } catch (err) {
    console.error("[WhatsApp webhook] Sheets logging error:", err);
  }
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

export const Route = createFileRoute("/api/whatsapp")({
  server: {
    handlers: {
      /**
       * Vérification du webhook — Meta appelle cette URL en GET lors de la configuration.
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
       * Réception d'un message entrant.
       * 1. Extraction du texte et du numéro expéditeur
       * 2. Chargement de l'historique session (Vercel KV)
       * 3. Appel Claude Haiku avec contexte complet
       * 4. Envoi WhatsApp + log Sheets en parallèle
       * 5. Sauvegarde de l'historique mis à jour
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

        // Ignorer les notifications de statut (delivered, read…) et les médias
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

        // Chargement de la session (historique + session ID)
        const session = await getSession(from);

        // Construction des messages pour Claude (historique + message courant)
        const claudeMessages: Message[] = [
          ...session.messages,
          { role: "user", content: userText },
        ];

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
                system: systemPrompt,
                messages: claudeMessages,
              }),
            }
          );

          if (!claudeRes.ok) {
            throw new Error(`Claude API error: ${claudeRes.status}`);
          }

          const claudeData = (await claudeRes.json()) as {
            content: { type: string; text: string }[];
          };
          reply =
            claudeData.content[0]?.text ??
            "Je n'ai pas pu générer une réponse.";
        } catch (err) {
          console.error("[WhatsApp webhook] Claude error:", err);
          reply =
            "Bonjour ! Je rencontre un problème technique momentané. N'hésitez pas à nous appeler au 06 51 57 79 09 ou à prendre rendez-vous sur Planity. À très bientôt !";
        }

        // Envoi WhatsApp + log Sheets en parallèle
        await Promise.all([
          // Envoi de la réponse via WhatsApp Cloud API
          fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
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
          }).catch((err) =>
            console.error("[WhatsApp webhook] WhatsApp send error:", err)
          ),

          // Logging dans Google Sheets
          logToSheets(session.sessionId, from, userText, reply),
        ]);

        // Mise à jour de la session
        await saveSession(from, {
          sessionId: session.sessionId,
          messages: [
            ...session.messages,
            { role: "user", content: userText },
            { role: "assistant", content: reply },
          ],
        });

        // Toujours renvoyer 200 à Meta pour éviter les retentatives
        return new Response("OK", { status: 200 });
      },
    },
  },
});
