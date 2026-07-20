import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/content";

export function PostNav({ prev, next }: { prev: Post | null; next: Post | null }) {
  if (!prev && !next) return null;

  return (
    <div className="container-prose grid gap-4 border-t border-border py-10 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="card-hover group flex flex-col rounded-2xl border border-border p-5"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ArrowLeft className="size-3.5" />
            Previous
          </span>
          <span className="mt-2 line-clamp-2 font-medium group-hover:text-primary">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="card-hover group flex flex-col rounded-2xl border border-border p-5 text-right sm:items-end"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            Next
            <ArrowRight className="size-3.5" />
          </span>
          <span className="mt-2 line-clamp-2 font-medium group-hover:text-primary">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
