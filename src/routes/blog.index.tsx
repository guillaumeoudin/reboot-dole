import { Link, createFileRoute } from "@tanstack/react-router";

import { EyebrowHeading } from "@/components/ui-kit";
import { formatDate, posts } from "@/lib/blog";
import { site } from "@/data/site";

const title = "Blog — conseils soins et longévité | Reboot Dole";
const description =
  "Conseils, protocoles et actualités du centre Reboot à Dole : épilation laser, soins de la peau, bien-être et longévité.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `Blog ${site.name}`,
          url: `${site.url}/blog`,
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            url: `${site.url}/blog/${post.slug}`,
          })),
        }),
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <>
      <section data-reveal className="glow-warm border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <EyebrowHeading
            as="h1"
            eyebrow="Le journal"
            title="Conseils, protocoles et longévité."
            intro="Nos réponses aux questions les plus fréquentes, écrites par l'équipe du centre. Pas de promesses démesurées, seulement ce qui fonctionne."
          />
        </div>
      </section>

      <section data-reveal className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          {posts.length === 0 ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Les premiers articles arrivent très bientôt.
            </p>
          ) : (
            <ul data-reveal-stagger className="grid gap-0.5 border border-border bg-border sm:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug} className="bg-background">
                  <article className="group flex h-full flex-col transition-colors hover:bg-surface">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.coverAlt}
                        width={1600}
                        height={1104}
                        loading="lazy"
                        decoding="async"
                        className="aspect-4/3 w-full object-cover"
                      />
                    ) : null}
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <p className="label-caps text-gold-soft">
                        {post.category}
                        <span aria-hidden="true" className="mx-2">
                          ·
                        </span>
                        {post.readingMinutes} min
                      </p>
                      <h2 className="mt-4 text-2xl leading-tight text-foreground transition-colors group-hover:text-gold">
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="after:absolute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <p className="mt-6 text-xs text-muted-foreground">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}