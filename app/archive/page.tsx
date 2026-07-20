import type { Metadata } from "next";
import Link from "next/link";
import { formatDateShort } from "@/lib/format";
import { getArchive } from "@/lib/content";

export const metadata: Metadata = {
  title: "Archive",
  description: "Every post, organized by year and month.",
};

export default function ArchivePage() {
  const archive = getArchive();

  return (
    <div className="container-prose py-16 sm:py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Archive</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Every essay, in order, since the beginning.
        </p>
      </div>

      <div className="space-y-14">
        {archive.map(({ year, months }) => (
          <div key={year}>
            <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight">{year}</h2>
            <div className="space-y-8">
              {months.map(({ month, posts }) => (
                <div key={month}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {month}
                  </h3>
                  <ul className="space-y-3 border-l border-border pl-5">
                    {posts.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                        >
                          <span className="font-medium text-foreground/90 transition-colors group-hover:text-primary">
                            {post.title}
                          </span>
                          <span className="shrink-0 text-sm text-muted-foreground">
                            {formatDateShort(post.date)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
