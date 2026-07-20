import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateShort } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function PostMeta({
  date,
  readingTime,
  className,
  size = "sm",
}: {
  date: string;
  readingTime: number;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-muted-foreground",
        size === "sm" ? "text-xs" : "text-sm",
        className
      )}
    >
      <Avatar size="sm">
        <AvatarImage src={siteConfig.author.avatar} alt={siteConfig.author.name} />
        <AvatarFallback>{siteConfig.author.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <span className="font-medium text-foreground/80">{siteConfig.author.name}</span>
      <span aria-hidden>·</span>
      <time dateTime={date}>{formatDateShort(date)}</time>
      <span aria-hidden>·</span>
      <span>{readingTime} min read</span>
    </div>
  );
}
