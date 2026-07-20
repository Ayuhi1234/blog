import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/motion/reveal";
import type { Post } from "@/lib/content";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section className="border-t border-border py-16">
      <div className="container-premium">
        <Reveal>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">Related Reading</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
