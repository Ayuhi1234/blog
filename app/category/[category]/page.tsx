import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { Pagination } from "@/components/blog/pagination";
import { CategoryIcon } from "@/components/category-icon";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/content";

const PER_PAGE = 9;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategory(category);
  if (!meta) return {};
  return {
    title: meta.label,
    description: meta.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const { page } = await searchParams;
  const meta = getCategory(category);
  if (!meta) notFound();

  const posts = getPostsByCategory(category);
  const currentPage = Math.max(1, Number(page) || 1);
  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const pagePosts = posts.slice(start, start + PER_PAGE);

  return (
    <div className="container-premium py-16 sm:py-20">
      <div className="mb-12 max-w-2xl">
        <div
          className={`mb-5 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white`}
        >
          <CategoryIcon name={meta.icon} className="size-6" />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{meta.label}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{meta.description}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
          <p className="text-lg font-medium">No articles here yet</p>
          <p className="mt-1.5 text-sm text-muted-foreground">Check back soon.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pagePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        basePath={`/category/${category}`}
      />
    </div>
  );
}
