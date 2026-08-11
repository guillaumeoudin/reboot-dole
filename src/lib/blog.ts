import { marked } from "marked";

/**
 * Chargement des articles de blog.
 *
 * Les articles sont des fichiers Markdown dans `content/blog/*.md` (édités à la
 * main sur GitHub ou via Decap CMS). Ils sont lus au moment du build par Vite
 * (`import.meta.glob` en `raw`) : aucune requête réseau au runtime, le site
 * reste 100 % statique et déployable sur Vercel.
 *
 * Voir README.md > "Blog & Decap CMS" pour la liste des champs.
 */

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  coverImage: string;
  coverAlt: string;
  draft: boolean;
  body: string;
  html: string;
  readingMinutes: number;
};

const modules = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Parse un frontmatter YAML simple : `clé: valeur`, guillemets optionnels. */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trim());
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line.trim());
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[kv[1]] = value;
  }

  return { data, body: match[2] ?? "" };
}

function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toPost(path: string, raw: string): BlogPost {
  const { data, body } = parseFrontmatter(raw);
  const fallbackSlug = path.split("/").pop()!.replace(/\.md$/, "");

  return {
    slug: data.slug || fallbackSlug,
    title: data.title || fallbackSlug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    author: data.author || "L'équipe Reboot",
    category: data.category || "Actualités",
    coverImage: data.coverImage || "",
    coverAlt: data.coverAlt || data.title || "",
    draft: data.draft === "true",
    body,
    html: marked.parse(body, { async: false }) as string,
    readingMinutes: readingMinutes(body),
  };
}

const allPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** Articles publiés (les brouillons `draft: true` sont exclus partout). */
export const posts: BlogPost[] = allPosts.filter((post) => !post.draft);

export const categories: string[] = Array.from(new Set(posts.map((p) => p.category))).sort();

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function relatedPosts(post: BlogPost, limit = 2): BlogPost[] {
  const sameCategory = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = posts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function formatDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}