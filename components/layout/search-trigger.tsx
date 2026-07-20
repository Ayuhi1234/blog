"use client";

import { Search } from "lucide-react";
import { useSearch } from "@/components/search/search-provider";
import { cn } from "@/lib/utils";

export function SearchTrigger({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { setOpen } = useSearch();

  if (compact) {
    return (
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen(true)}
        className={cn(
          "flex size-9 items-center justify-center rounded-full border border-border/70 bg-muted/40 text-muted-foreground transition-colors hover:text-foreground cursor-pointer",
          className
        )}
      >
        <Search className="size-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "group flex w-full max-w-56 items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground cursor-pointer",
        className
      )}
    >
      <Search className="size-4 shrink-0" />
      <span className="flex-1 text-left">Search</span>
      <kbd className="hidden items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
        <span>Ctrl</span>K
      </kbd>
    </button>
  );
}
