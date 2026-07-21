"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

const REPO = process.env.NEXT_PUBLIC_GISCUS_REPO;
const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

export function GiscusComments() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!REPO || !REPO_ID || !CATEGORY || !CATEGORY_ID) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Comments aren&apos;t configured yet — set NEXT_PUBLIC_GISCUS_REPO,
          NEXT_PUBLIC_GISCUS_REPO_ID, NEXT_PUBLIC_GISCUS_CATEGORY, and
          NEXT_PUBLIC_GISCUS_CATEGORY_ID to enable them.
        </div>
      );
    }
    return null;
  }

  if (!mounted) return null;

  return (
    <Giscus
      id="comments"
      repo={REPO as `${string}/${string}`}
      repoId={REPO_ID}
      category={CATEGORY}
      categoryId={CATEGORY_ID}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      lang="en"
      loading="lazy"
    />
  );
}
