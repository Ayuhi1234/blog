import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX, type Options as MDXOptions } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { CATEGORY_SLUGS } from "./lib/categories";

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string) {
  const headings: { depth: number; text: string; slug: string }[] = [];
  const seen = new Map<string, number>();
  for (const rawLine of content.split("\n")) {
    const match = /^(#{2,3})\s+(.*)$/.exec(rawLine.trim());
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].replace(/[*_`]/g, "").trim();
    let slug = slugifyHeading(text);
    const count = seen.get(slug) ?? 0;
    seen.set(slug, count + 1);
    if (count > 0) slug = `${slug}-${count}`;
    headings.push({ depth, text, slug });
  }
  return headings;
}

const mdxOptions: MDXOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [
      rehypePrettyCode,
      {
        theme: { dark: "github-dark-dimmed", light: "github-light" },
        keepBackground: false,
        defaultLang: "plaintext",
      },
    ],
  ],
};

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    content: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    author: z.string().default("yourname"),
    category: z.enum(CATEGORY_SLUGS),
    tags: z.array(z.string()).default([]),
    coverImage: z.string(),
    coverImageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    series: z.string().optional(),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc, mdxOptions);
    return {
      ...doc,
      mdx,
      slug: doc._meta.path,
      readingTime: estimateReadingTime(doc.content),
      wordCount: doc.content.trim().split(/\s+/).filter(Boolean).length,
      headings: extractHeadings(doc.content),
    };
  },
});

const books = defineCollection({
  name: "books",
  directory: "content/books",
  include: "**/*.mdx",
  schema: z.object({
    content: z.string(),
    title: z.string(),
    author: z.string(),
    coverImage: z.string(),
    rating: z.number().min(1).max(5).optional(),
    status: z.enum(["reading", "completed", "want-to-read"]),
    genre: z.string(),
    date: z.string(),
    dateFinished: z.string().optional(),
    pages: z.number().optional(),
    takeaways: z.array(z.string()).default([]),
    favoriteQuotes: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc, mdxOptions);
    return {
      ...doc,
      mdx,
      slug: doc._meta.path,
    };
  },
});

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  schema: z.object({
    content: z.string(),
    title: z.string(),
    description: z.string(),
    coverImage: z.string(),
    tech: z.array(z.string()).default([]),
    github: z.url().optional(),
    demo: z.url().optional(),
    features: z.array(z.string()).default([]),
    status: z.enum(["live", "in-progress", "archived"]).default("live"),
    featured: z.boolean().default(false),
    date: z.string(),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc, mdxOptions);
    return {
      ...doc,
      mdx,
      slug: doc._meta.path,
    };
  },
});

export default defineConfig({
  content: [posts, books, projects],
});
