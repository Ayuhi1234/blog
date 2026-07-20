import { allPosts, allBooks, allProjects } from "content-collections";

export type Post = (typeof allPosts)[number];
export type Book = (typeof allBooks)[number];
export type Project = (typeof allProjects)[number];

function byDateDesc(a: { date: string }, b: { date: string }) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllPosts(): Post[] {
  return allPosts
    .filter((p) => !p.draft || process.env.NODE_ENV !== "production")
    .sort(byDateDesc);
}

export function getFeaturedPosts(limit = 3): Post[] {
  const featured = getAllPosts().filter((p) => p.featured);
  return (featured.length ? featured : getAllPosts()).slice(0, limit);
}

export function getLatestPosts(limit = 6): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tag)
  );
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const map = new Map<string, { tag: string; slug: string; count: number }>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const slug = tag.toLowerCase().replace(/\s+/g, "-");
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { tag, slug, count: 1 });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const scored = others.map((p) => {
    let score = 0;
    if (p.category === post.category) score += 3;
    score += p.tags.filter((t) => post.tags.includes(t)).length;
    return { post: p, score };
  });
  const related = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.post);
  if (related.length >= limit) return related.slice(0, limit);
  const fallback = others.filter((p) => !related.includes(p));
  return [...related, ...fallback].slice(0, limit);
}

export function getAdjacentPosts(post: Post): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === post.slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getPopularPosts(limit = 5): Post[] {
  return [...getAllPosts()].sort((a, b) => b.wordCount - a.wordCount).slice(0, limit);
}

export function getArchive(): { year: number; months: { month: string; posts: Post[] }[] }[] {
  const posts = getAllPosts();
  const years = new Map<number, Map<string, Post[]>>();
  for (const post of posts) {
    const d = new Date(post.date);
    const year = d.getFullYear();
    const month = d.toLocaleDateString("en-US", { month: "long" });
    if (!years.has(year)) years.set(year, new Map());
    const monthMap = years.get(year)!;
    if (!monthMap.has(month)) monthMap.set(month, []);
    monthMap.get(month)!.push(post);
  }
  return Array.from(years.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, monthMap]) => ({
      year,
      months: Array.from(monthMap.entries()).map(([month, posts]) => ({ month, posts })),
    }));
}

export function getAllBooks(): Book[] {
  return [...allBooks].sort(byDateDesc);
}

export function getFeaturedBooks(limit = 4): Book[] {
  const featured = getAllBooks().filter((b) => b.featured);
  return (featured.length ? featured : getAllBooks()).slice(0, limit);
}

export function getBookBySlug(slug: string): Book | undefined {
  return getAllBooks().find((b) => b.slug === slug);
}

export function getAllProjects(): Project[] {
  return [...allProjects].sort(byDateDesc);
}

export function getFeaturedProjects(limit = 4): Project[] {
  const featured = getAllProjects().filter((p) => p.featured);
  return (featured.length ? featured : getAllProjects()).slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
