"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = { depth: number; text: string; slug: string };

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 1.0 }
    );
    for (const heading of headings) {
      const el = document.getElementById(heading.slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1 text-sm">
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className={cn(
                "block border-l-2 border-border py-1 pl-3 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
                heading.depth === 3 && "pl-6",
                activeId === heading.slug && "border-primary font-medium text-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
