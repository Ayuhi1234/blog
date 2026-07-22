import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { CategoryBadge } from "@/components/category-badge";
import { PostMeta } from "@/components/blog/post-meta";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/content";
import type { DiscussionCounts } from "@/lib/github-discussions";

function DiscussionCountsRow({
  counts,
  className,
}: {
  counts?: DiscussionCounts;
  className?: string;
}) {
  if (!counts) return null;
  return (
    <div className={cn("flex items-center gap-3 text-muted-foreground", className)}>
      <span className="flex items-center gap-1">
        <Heart size={14} /> {counts.reactions}
      </span>
      <span className="flex items-center gap-1">
        <MessageCircle size={14} /> {counts.comments}
      </span>
    </div>
  );
}

export function PostCard({
  post,
  className,
  priority = false,
  counts,
}: {
  post: Post;
  className?: string;
  priority?: boolean;
  counts?: DiscussionCounts;
}) {
  return (
    <article className={cn("card-hover group relative flex flex-col", className)}>
      <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <div className="mb-2.5 flex items-center gap-2">
            <CategoryBadge category={post.category} asLink={false} />
          </div>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          <PostMeta date={post.date} readingTime={post.readingTime} className="mt-4" />
          <DiscussionCountsRow counts={counts} className="mt-2 text-xs" />
        </div>
      </Link>
    </article>
  );
}

export function PostCardFeatured({
  post,
  counts,
}: {
  post: Post;
  counts?: DiscussionCounts;
}) {
  return (
    <article className="card-hover group relative overflow-hidden rounded-3xl border border-border">
      <Link href={`/blog/${post.slug}`} className="grid lg:grid-cols-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted lg:aspect-auto">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            priority
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <div className="mb-3 flex items-center gap-2">
            <CategoryBadge category={post.category} asLink={false} />
            <span className="rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
              Featured
            </span>
          </div>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-base leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          <PostMeta date={post.date} readingTime={post.readingTime} className="mt-6" size="md" />
          <DiscussionCountsRow counts={counts} className="mt-3 text-sm" />
        </div>
      </Link>
    </article>
  );
}
