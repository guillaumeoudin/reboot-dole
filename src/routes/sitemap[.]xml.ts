import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { posts } from "@/lib/blog";
import { site } from "@/data/site";

const BASE_URL = site.url;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/soins",
          "/soins/epilation-laser",
          "/soins/cryolipolyse",
          "/soins/peeling",
          "/soins/microneedling",
          "/bien-etre",
          "/yoga-dole",
          "/epilation-laser-jambes-dole",
          "/epilation-laser-maillot-dole",
          "/cryolipolyse-ventre-dole",
          "/concept",
          "/blog",
          "/contact",
        ];
        const entries = [
          ...staticPaths.map((path) => ({ path, changefreq: "monthly", priority: path === "/" ? "1.0" : "0.8" })),
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