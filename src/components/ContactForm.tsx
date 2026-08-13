import { useState } from "react";
import { site } from "@/data/site";

/**
 * Formulaire de contact — soumet via Google Apps Script (mode no-cors).
 * URL du script à définir dans VITE_CONTACT_SCRIPT_URL (Vercel env vars + .env.local).
 */
const SCRIPT_URL = import.meta.env.VITE_CONTACT_SCRIPT_URL as string | undefined;

const SUBJECTS = [
  "Demande d'informations",
  "Prise de rendez-vous",
  "Devis",
  "Autre",
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-2 w-full border border-input bg-input px-3 py-2.5 text-sm text-foreground " +
  "placeholder:text-muted-foreground/40 " +
  "focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors";

const labelClass = "label-caps text-muted-foreground";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function set(field: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!SCRIPT_URL) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      // mode: no-cors — la réponse est opaque, mais la requête arrive bien côté Apps Script.
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(form),
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border bg-surface p-8">
        <p className="label-caps text-gold">Message envoyé ✓</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Merci pour votre message. Nous vous répondrons sous 24h ouvrées. En
          attendant, vous pouvez réserver directement sur{" "}
          <a
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Planity
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border border-border bg-surface p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Nom & Prénom *</span>
          <input
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Cléopâtre"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Email *</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            placeholder="cleopatre@palais-alexandrie.eg"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Téléphone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="01 40 20 50 50"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Objet</span>
          <select value={form.subject} onChange={set("subject")} className={inputClass}>
            <option value="">Choisir…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Message *</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          placeholder="Bonjour, depuis que Marc Antoine est reparti à Rome je me laisse un peu aller. Je voudrais reprendre soin de moi. Vous faites le cryolipolyse sur le Nil ou faut-il se déplacer ?"
          className={`${inputClass} resize-none`}
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Une erreur est survenue. Contactez-nous directement à{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <div className="flex items-center gap-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-gold-cta px-6 py-3 text-sm font-medium text-gold-cta-foreground transition-colors hover:bg-gold-cta-soft disabled:opacity-50"
        >
          {status === "submitting" ? "Envoi…" : "Envoyer →"}
        </button>
        <p className="text-xs text-muted-foreground">* Champs obligatoires</p>
      </div>

      <p className="text-xs text-muted-foreground">
        Pour une réservation directe,{" "}
        <a
          href={site.booking}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline"
        >
          utilisez Planity
        </a>
        .
      </p>
    </form>
  );
}
