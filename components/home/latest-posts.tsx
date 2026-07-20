import { SectionHeader } from "@/components/section-header";
import { PostCard } from "@/components/blog/post-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { Post } from "@/lib/content";

export function LatestPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;

  return (
    <section className="container-premium py-20 sm:py-28">
      <SectionHeader
        eyebrow="Fresh Off the Press"
        title="Latest Blogs"
        description="Everything, most recent first."
        href="/blog"
        className="mb-10"
      />
      <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <StaggerItem key={post.slug}>
            <PostCard post={post} priority={i < 3} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
