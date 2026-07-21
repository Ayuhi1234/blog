import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { MDXContent } from "@content-collections/mdx/react";
import { CategoryBadge } from "@/components/category-badge";
import { PostMeta } from "@/components/blog/post-meta";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { RelatedPosts } from "@/components/blog/related-posts";
import { PostNav } from "@/components/blog/post-nav";
import { GiscusComments } from "@/components/blog/giscus-comments";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { siteConfig } from "@/config/site";
import { formatDateISO } from "@/lib/format";
import { getAllPosts, getPostBySlug, getRelatedPosts, getAdjacentPosts } from "@/lib/content";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const { prev, next } = getAdjacentPosts(post);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.coverImage}`,
    datePublished: formatDateISO(post.date),
    dateModified: formatDateISO(post.updated ?? post.date),
    author: { "@type": "Person", name: siteConfig.author.name, url: siteConfig.url },
    publisher: { "@type": "Person", name: siteConfig.author.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <ReadingProgress />
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-12 sm:py-16">
        <div className="container-prose">
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <CategoryBadge category={post.category} asLink={false} className="border-0 bg-transparent p-0 text-muted-foreground hover:text-foreground" />
          </nav>

          <div className="mb-4 flex items-center gap-2">
            <CategoryBadge category={post.category} withIcon />
          </div>

          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.description}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
            <PostMeta date={post.date} readingTime={post.readingTime} size="md" />
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>

        <div className="container-premium mt-10">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        <div className="container-premium mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="mx-auto w-full max-w-[720px]">
            <div className="prose-premium">
              <MDXContent code={post.mdx} components={mdxComponents} />
            </div>

            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
              <Image
                src={siteConfig.author.avatar}
                alt={siteConfig.author.name}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{siteConfig.author.name}</p>
                <p className="text-sm text-muted-foreground">{siteConfig.author.role}</p>
              </div>
            </div>

            <div className="mt-12 border-t border-border pt-10">
              <GiscusComments />
            </div>
          </div>

          <aside className="hidden lg:block">
            <TableOfContents headings={post.headings} />
          </aside>
        </div>
      </article>

      <RelatedPosts posts={related} />
      <PostNav prev={prev} next={next} />
    </>
  );
}
