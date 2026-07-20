"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";

export function BlogFilters({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const currentQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(currentQuery);
  const [syncedQuery, setSyncedQuery] = useState(currentQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (currentQuery !== syncedQuery) {
    setSyncedQuery(currentQuery);
    setQuery(currentQuery);
  }

  function updateParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParams({ q: value || null }), 350);
  }

  return (
    <div className="mb-10 space-y-5">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search articles…"
          className="h-11 w-full rounded-full border border-border bg-card pl-10 pr-9 text-sm outline-none transition-colors focus:border-primary/50"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              updateParams({ q: null });
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href={pathname}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            !activeCategory
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
          )}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`${pathname}?category=${cat.slug}`}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              activeCategory === cat.slug
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        {resultCount} {resultCount === 1 ? "article" : "articles"}
      </p>
    </div>
  );
}
