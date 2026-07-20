import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { Tag } from "lucide-react";
import { getAllTags, getPostsByTag } from "@/lib/content";

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const match = getAllTags().find((t) => t.slug === tag);
  if (!match) return {};
  return {
    title: `#${match.tag}`,
    description: `Posts tagged with ${match.tag}.`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const match = getAllTags().find((t) => t.slug === tag);
  if (!match) notFound();

  const posts = getPostsByTag(tag);

  return (
    <div className="container-premium py-16 sm:py-20">
      <div className="mb-12 max-w-2xl">
        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-muted">
          <Tag className="size-5 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">#{match.tag}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? "article" : "articles"} tagged with this topic
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
