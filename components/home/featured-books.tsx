import { SectionHeader } from "@/components/section-header";
import { BookCard } from "@/components/books/book-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { Book } from "@/lib/content";

export function FeaturedBooks({ books }: { books: Book[] }) {
  if (!books.length) return null;

  return (
    <section className="container-premium py-20 sm:py-28">
      <SectionHeader
        eyebrow="Currently & Recently"
        title="Featured Books"
        description="Notes, ratings, and takeaways from what I'm reading."
        href="/books"
        className="mb-10"
      />
      <StaggerGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {books.map((book) => (
          <StaggerItem key={book.slug}>
            <BookCard book={book} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
