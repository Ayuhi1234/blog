import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar, CheckCircle2, Quote } from "lucide-react";
import { MDXContent } from "@content-collections/mdx/react";
import { StarRating } from "@/components/books/star-rating";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { formatDate } from "@/lib/format";
import { getAllBooks, getBookBySlug } from "@/lib/content";
import { cn } from "@/lib/utils";

const STATUS_LABEL = {
  reading: "Currently Reading",
  completed: "Completed",
  "want-to-read": "Want to Read",
} as const;

export function generateStaticParams() {
  return getAllBooks().map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  return {
    title: book.title,
    description: `${book.title} by ${book.author} — notes, rating, and takeaways.`,
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  return (
    <div className="container-premium py-12 sm:py-16">
      <Link
        href="/books"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to Books
      </Link>

      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div>
          <div className="sticky top-24">
            <div className="relative aspect-[2/3] w-full max-w-[280px] overflow-hidden rounded-2xl border border-border shadow-lg">
              <Image src={book.coverImage} alt={`${book.title} cover`} fill className="object-cover" priority />
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
              book.status === "completed" && "border-brand-emerald/30 bg-brand-emerald-soft text-brand-emerald",
              book.status === "reading" && "border-brand-blue/30 bg-brand-blue-soft text-brand-blue",
              book.status === "want-to-read" && "border-border bg-muted text-muted-foreground"
            )}
          >
            {STATUS_LABEL[book.status]}
          </span>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{book.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>

          {book.rating && (
            <div className="mt-4 flex items-center gap-2">
              <StarRating rating={book.rating} className="[&_svg]:size-5" />
              <span className="text-sm text-muted-foreground">{book.rating}/5</span>
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">Genre</p>
              <p className="mt-1 text-sm font-medium">{book.genre}</p>
            </div>
            {book.pages && (
              <div>
                <p className="text-xs text-muted-foreground">Pages</p>
                <p className="mt-1 text-sm font-medium">{book.pages}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">Added</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-medium">
                <Calendar className="size-3.5" />
                {formatDate(book.date, { month: "short", day: undefined })}
              </p>
            </div>
            {book.dateFinished && (
              <div>
                <p className="text-xs text-muted-foreground">Finished</p>
                <p className="mt-1 flex items-center gap-1 text-sm font-medium">
                  <BookOpen className="size-3.5" />
                  {formatDate(book.dateFinished, { month: "short", day: undefined })}
                </p>
              </div>
            )}
          </div>

          {book.takeaways.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Key Takeaways</h2>
              <ul className="mt-4 space-y-3">
                {book.takeaways.map((takeaway) => (
                  <li key={takeaway} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-emerald" />
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {book.favoriteQuotes.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Favorite Quotes</h2>
              <div className="mt-4 space-y-3">
                {book.favoriteQuotes.map((quote) => (
                  <blockquote
                    key={quote}
                    className="flex gap-3 rounded-2xl border border-border bg-muted/40 p-4 text-[15px] italic leading-relaxed text-foreground/85"
                  >
                    <Quote className="mt-0.5 size-4 shrink-0 text-brand-purple/60" />
                    {quote}
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          <div className="prose-premium mt-10 border-t border-border pt-8">
            <MDXContent code={book.mdx} components={mdxComponents} />
          </div>
        </div>
      </div>
    </div>
  );
}
