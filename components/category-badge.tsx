import Link from "next/link";
import { getCategory } from "@/lib/categories";
import { CategoryIcon } from "@/components/category-icon";
import { cn } from "@/lib/utils";

export function CategoryBadge({
  category,
  className,
  withIcon = false,
  asLink = true,
}: {
  category: string;
  className?: string;
  withIcon?: boolean;
  asLink?: boolean;
}) {
  const meta = getCategory(category);
  const label = meta?.label ?? category;

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground/80 transition-colors",
        asLink && "hover:border-foreground/30 hover:text-foreground",
        className
      )}
    >
      {withIcon && <CategoryIcon name={meta?.icon ?? "Sparkles"} className="size-3.5" />}
      {label}
    </span>
  );

  if (!asLink) return content;

  return <Link href={`/category/${category}`}>{content}</Link>;
}
