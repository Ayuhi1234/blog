import { SectionHeader } from "@/components/section-header";
import { PostCardFeatured, PostCard } from "@/components/blog/post-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { Post } from "@/lib/content";

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  const [lead, ...rest] = posts;

  return (
    <section className="container-premium py-20 sm:py-28">
      <SectionHeader
        eyebrow="Editor's Picks"
        title="Featured Blogs"
        description="The essays I'd point a first-time reader to."
        href="/blog?featured=true"
        className="mb-10"
      />
      <Reveal>
        <PostCardFeatured post={lead} />
      </Reveal>
      {rest.length > 0 && (
        <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((post) => (
            <StaggerItem key={post.slug}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </section>
  );
}
