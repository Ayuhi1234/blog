import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogFilters } from "@/components/blog/blog-filters";
import { PostCard, PostCardFeatured } from "@/components/blog/post-card";
import { Pagination } from "@/components/blog/pagination";
import { getAllPosts } from "@/lib/content";
import { getDiscussionCountsByPathnames } from "@/lib/github-discussions";

export const metadata: Metadata = {
  title: "Blog",
  description: "Software engineering, AI, startups, books, and everything in between.",
};

export const revalidate = 3600;

const PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; page?: string; featured?: string }>;
}) {
  const params = await searchParams;
  const allPosts = getAllPosts();

  let filtered = allPosts;
  if (params.category) {
    filtered = filtered.filter((p) => p.category === params.category);
  }
  if (params.featured === "true") {
    filtered = filtered.filter((p) => p.featured);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  const currentPage = Math.max(1, Number(params.page) || 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const isFirstPageUnfiltered = safePage === 1 && !params.category && !params.q;

  const start = (safePage - 1) * PER_PAGE;
  let pagePosts = filtered.slice(start, start + PER_PAGE);

  let featuredLead = null;
  if (isFirstPageUnfiltered && pagePosts.length > 0) {
    featuredLead = pagePosts[0];
    pagePosts = pagePosts.slice(1);
  }

  const visiblePosts = featuredLead ? [featuredLead, ...pagePosts] : pagePosts;
  const counts = await getDiscussionCountsByPathnames(
    visiblePosts.map((post) => `/blog/${post.slug}`)
  );

  return (
    <div className="container-premium py-16 sm:py-20">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">The Blog</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Software engineering, AI, startups, books, and everything in between —
          written close to the moment of learning it.
        </p>
      </div>

      <Suspense>
        <BlogFilters resultCount={filtered.length} />
      </Suspense>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
          <p className="text-lg font-medium">No articles found</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Try a different search term or category.
          </p>
        </div>
      ) : (
        <>
          {featuredLead && (
            <PostCardFeatured post={featuredLead} counts={counts.get(`/blog/${featuredLead.slug}`)} />
          )}
          <div className={featuredLead ? "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
            {pagePosts.map((post) => (
              <PostCard key={post.slug} post={post} counts={counts.get(`/blog/${post.slug}`)} />
            ))}
          </div>
        </>
      )}

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        basePath="/blog"
        params={{ category: params.category, q: params.q }}
      />
    </div>
  );
}
