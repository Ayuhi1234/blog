import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Lock } from "lucide-react";
import { PostEditor } from "@/components/write/post-editor";
import { WriteAuthGate } from "@/components/write/write-auth-gate";
import { getAllPosts, getAllTags } from "@/lib/content";
import { computeStreakStats } from "@/lib/streaks";
import { SESSION_COOKIE, isWriteEnabledInProduction, verifySessionCookieValue } from "@/lib/write-auth";

export const metadata: Metadata = {
  title: "Write",
  robots: { index: false, follow: false },
};

// Always evaluate fresh — env vars (WRITE_PASSWORD/GITHUB_TOKEN/GITHUB_REPO) and
// the session cookie must never be baked into a static build.
export const dynamic = "force-dynamic";

export default async function WritePage() {
  const isDev = process.env.NODE_ENV !== "production";
  const configured = isWriteEnabledInProduction();

  if (!isDev && !configured) {
    return (
      <div className="container-premium flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          <Lock className="size-6 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Not available here</h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Writing from this deployment isn&apos;t configured yet. Set{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">WRITE_PASSWORD</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">GITHUB_TOKEN</code>, and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">GITHUB_REPO</code> in your
          deployment&apos;s environment variables, or write locally with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">npm run dev</code>.
        </p>
      </div>
    );
  }

  if (!isDev && configured) {
    const cookieStore = await cookies();
    const authenticated = verifySessionCookieValue(cookieStore.get(SESSION_COOKIE)?.value);
    if (!authenticated) {
      return (
        <div className="container-premium">
          <WriteAuthGate />
        </div>
      );
    }
  }

  const allPosts = getAllPosts();
  const existingSlugs = allPosts.map((p) => p.slug);
  const tagSuggestions = getAllTags()
    .slice(0, 20)
    .map((t) => t.tag);
  const initialStreak = computeStreakStats(allPosts.map((p) => p.date));

  return (
    <div className="container-premium py-10">
      <PostEditor
        existingSlugs={existingSlugs}
        tagSuggestions={tagSuggestions}
        initialStreak={initialStreak}
        viaGitHub={!isDev}
      />
    </div>
  );
}
