import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function buildHref(basePath: string, params: Record<string, string | undefined>, page: number) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  if (page > 1) search.set("page", String(page));
  const qs = search.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  params = {},
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  params?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-14 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <Link
        href={buildHref(basePath, params, currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={cn(
          "flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground",
          currentPage === 1 && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeft className="size-4" />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(basePath, params, page)}
          className={cn(
            "flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
            page === currentPage
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {page}
        </Link>
      ))}

      <Link
        href={buildHref(basePath, params, currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={cn(
          "flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground",
          currentPage === totalPages && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
