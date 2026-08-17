import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { posts } from "@/lib/blog";
import { site } from "@/data/site";

const BASE_URL = site.url;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths: { path: string; priority: string }[] = [
          { path: "/", priority: "1.0" },
          { path: "/soins", priority: "0.9" },
          { path: "/soins/epilation-laser", priority: "0.9" },
          { path: "/soins/cryolipolyse", priority: "0.8" },
          { path: "/soins/peeling", priority: "0.8" },
          { path: "/soins/microneedling", priority: "0.8" },
          { path: "/soins/dome-led", priority: "0.8" },
          { path: "/bien-etre", priority: "0.8" },
          // Landing pages SEO — hubs en tête, spécifiques ensuite
          { path: "/epilation-laser-dole", priority: "0.9" },
          { path: "/cryolipolyse-dole", priority: "0.9" },
          { path: "/solution-minceur-dole", priority: "0.8" },
          { path: "/epilation-laser-jambes-dole", priority: "0.7" },
          { path: "/epilation-laser-maillot-dole", priority: "0.7" },
          { path: "/cryolipolyse-ventre-dole", priority: "0.7" },
          { path: "/yoga-dole", priority: "0.7" },
          { path: "/concept", priority: "0.7" },
          { path: "/blog", priority: "0.8" },
          { path: "/contact", priority: "0.8" },
        ];
        const entries = [
          ...staticPaths.map(({ path, priority }) => ({ path, changefreq: "monthly", priority })),
          ...posts.map((post) => ({
            path: `/blog/${post.slug}`,
            changefreq: "yearly",
            priority: "0.6",
            lastmod: post.date || undefined,
          })),
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              "lastmod" in e && e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
              `    <changefreq>${e.changefreq}</changefreq>`,
              `    <priority>${e.priority}</priority>`,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});