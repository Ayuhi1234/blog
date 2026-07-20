import { getAllBooks, getAllPosts, getAllProjects } from "@/lib/content";

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "Post" | "Book" | "Project";
  category?: string;
};

export function getSearchIndex(): SearchItem[] {
  const posts = getAllPosts().map((p) => ({
    id: `post-${p.slug}`,
    title: p.title,
    description: p.description,
    url: `/blog/${p.slug}`,
    type: "Post" as const,
    category: p.category,
  }));
  const books = getAllBooks().map((b) => ({
    id: `book-${b.slug}`,
    title: b.title,
    description: `by ${b.author}`,
    url: `/books/${b.slug}`,
    type: "Book" as const,
  }));
  const projects = getAllProjects().map((p) => ({
    id: `project-${p.slug}`,
    title: p.title,
    description: p.description,
    url: `/projects#${p.slug}`,
    type: "Project" as const,
  }));
  return [...posts, ...books, ...projects];
}
