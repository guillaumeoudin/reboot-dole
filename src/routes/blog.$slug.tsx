import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { BookButton } from "@/components/ui-kit";
import { site } from "@/data/site";
import { formatDate, getPost, relatedPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, related: relatedPosts(post) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article introuvable — Reboot Dole" }, { name: "robots", content: "noindex" }],
      };
    }

    const { post } = loaderData;
    const url = `${site.url}/blog/${post.slug}`;
    const image = post.coverImage ? `${site.url}${post.coverImage}` : null;

    return {
      meta: [
        { title: `${post.title} — Reboot Dole` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Organization", name: post.author },
            publisher: { "@type": "Organization", name: site.name, url: site.url },
            mainEntityOfPage: url,
            ...(image ? { image } : {}),
          }),
        },
      ],
    };
  },
  notFoundComponent: BlogPostNotFound,
  component: BlogPostPage,
});

function BlogPostNotFound() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <h1 className="text-3xl text-foreground sm:text-4xl">Cet article n'existe pas.</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Il a peut-être été renommé ou dépublié.
        </p>
        <div className="mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Retour au blog <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function BlogPostPage() {
  const { post, related } = Route.useLoaderData();

  return (
    <>
      <section className="glow-warm border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-20">
          <nav aria-label="Fil d'ariane" className="label-caps text-gold">
            <Link to="/blog" className="transition-colors hover:text-gold-soft">
              Le journal
            </Link>
          </nav>
          <h1 className="mt-5 text-3xl leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            {post.category}
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            {post.readingMinutes} min de lecture
          </p>
        </div>
      </section>

      <article className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.coverAlt}
              width={1600}
              height={1104}
              decoding="async"
              className="mb-12 aspect-4/3 w-full object-cover"
            />
          ) : null}
          <div className="prose-reboot" dangerouslySetInnerHTML={{ __html: post.html }} />

          <div className="mt-14 border border-border bg-surface p-8">
            <p className="label-caps text-gold">Envie d'aller plus loin ?</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Le bilan initial permet de définir le protocole adapté à votre peau et à vos
              objectifs.
            </p>
            <div className="mt-8">
              <BookButton />
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="label-caps text-gold">À lire aussi</h2>
            <ul className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug} className="bg-background p-6 sm:p-8">
                  <p className="label-caps text-gold-soft">{item.category}</p>
                  <h3 className="mt-4 text-xl leading-tight text-foreground">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: item.slug }}
                      className="transition-colors hover:text-gold"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}