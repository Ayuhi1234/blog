import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { CATEGORIES } from "@/lib/categories";
import { getAllBooks, getAllPosts, getAllTags } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const books = getAllBooks();
  const tags = getAllTags();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/books`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/projects`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/archive`, changeFrequency: "weekly", priority: 0.4 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const bookRoutes: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${siteConfig.url}/books/${book.slug}`,
    lastModified: book.dateFinished ?? book.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${siteConfig.url}/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((t) => ({
    url: `${siteConfig.url}/tag/${t.slug}`,
    changeFrequency: "weekly",
    priority: 0.3,
  }));

  return [...staticRoutes, ...postRoutes, ...bookRoutes, ...categoryRoutes, ...tagRoutes];
}
