import type { Metadata } from "next";
import Link from "next/link";
import { BookCard } from "@/components/books/book-card";
import { cn } from "@/lib/utils";
import { getAllBooks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Books",
  description: "Notes, ratings, and takeaways from everything I'm reading.",
};

const FILTERS = [
  { value: undefined, label: "All" },
  { value: "reading", label: "Currently Reading" },
  { value: "completed", label: "Completed" },
  { value: "want-to-read", label: "Want to Read" },
] as const;

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const allBooks = getAllBooks();
  const books = status ? allBooks.filter((b) => b.status === status) : allBooks;

  return (
    <div className="container-premium py-16 sm:py-20">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Books</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          A running shelf — what I&apos;m reading, what I&apos;ve finished, and what I
          thought of it.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.label}
            href={f.value ? `/books?status=${f.value}` : "/books"}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              status === f.value || (!status && !f.value)
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
          <p className="text-lg font-medium">No books here yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
