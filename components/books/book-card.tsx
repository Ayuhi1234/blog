import Link from "next/link";
import Image from "next/image";
import { StarRating } from "@/components/books/star-rating";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/content";

const STATUS_LABEL: Record<Book["status"], string> = {
  reading: "Currently Reading",
  completed: "Completed",
  "want-to-read": "Want to Read",
};

const STATUS_CLASS: Record<Book["status"], string> = {
  reading: "bg-brand-blue-soft text-brand-blue border-brand-blue/30",
  completed: "bg-brand-emerald-soft text-brand-emerald border-brand-emerald/30",
  "want-to-read": "bg-muted text-muted-foreground border-border",
};

export function BookCard({ book, className }: { book: Book; className?: string }) {
  return (
    <article className={cn("card-hover group flex flex-col", className)}>
      <Link href={`/books/${book.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
          <Image
            src={book.coverImage}
            alt={`${book.title} cover`}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <div className="flex flex-1 flex-col pt-3.5">
          <span
            className={cn(
              "mb-2 inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
              STATUS_CLASS[book.status]
            )}
          >
            {STATUS_LABEL[book.status]}
          </span>
          <h3 className="text-[15px] font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
          <StarRating rating={book.rating} className="mt-2" />
        </div>
      </Link>
    </article>
  );
}
