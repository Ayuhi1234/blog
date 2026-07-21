import type { Metadata } from "next";
import { Laptop } from "lucide-react";
import { PostEditor } from "@/components/write/post-editor";
import { getAllPosts, getAllTags, toEditablePost } from "@/lib/content";
import { computeStreakStats } from "@/lib/streaks";

export const metadata: Metadata = {
  title: "Write",
  robots: { index: false, follow: false },
};

export default function WritePage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="container-premium flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          <Laptop className="size-6 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Write locally</h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          This tool saves posts straight to disk, so it only runs on your own
          machine. Start it with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">npm run dev</code>{" "}
          and open this page from there — then commit and push when you&apos;re
          ready to publish.
        </p>
      </div>
    );
  }

  const allPosts = getAllPosts();
  const existingSlugs = allPosts.map((p) => p.slug);
  const editablePosts = allPosts.map(toEditablePost);
  const tagSuggestions = getAllTags()
    .slice(0, 20)
    .map((t) => t.tag);
  const initialStreak = computeStreakStats(allPosts.map((p) => p.date));

  return (
    <div className="container-premium py-10">
      <PostEditor
        existingSlugs={existingSlugs}
        editablePosts={editablePosts}
        tagSuggestions={tagSuggestions}
        initialStreak={initialStreak}
      />
    </div>
  );
}
