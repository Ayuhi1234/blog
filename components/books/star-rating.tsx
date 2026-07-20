import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ rating, className }: { rating?: number; className?: string }) {
  if (!rating) return null;
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating ? "fill-amber-400 text-amber-400" : "fill-none text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  );
}
