import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { localDateString, slugify } from "@/lib/format";
import { generatePostCoverSvg } from "@/lib/generate-post-cover";
import { getAllPosts } from "@/lib/content";
import { computeStreakStats } from "@/lib/streaks";
import { createGitHubFile, githubFileExists } from "@/lib/github";
import { SESSION_COOKIE, isWriteEnabledInProduction, verifySessionCookieValue } from "@/lib/write-auth";

function yamlString(value: string) {
  return JSON.stringify(value);
}

function yamlStringArray(values: string[]) {
  return `[${values.map((v) => JSON.stringify(v)).join(", ")}]`;
}

async function fileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const isDev = process.env.NODE_ENV !== "production";

  if (!isDev) {
    if (!isWriteEnabledInProduction()) {
      return NextResponse.json(
        { error: "Writing isn't configured on this deployment." },
        { status: 403 }
      );
    }
    const cookieStore = await cookies();
    const authenticated = verifySessionCookieValue(cookieStore.get(SESSION_COOKIE)?.value);
    if (!authenticated) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    title,
    description,
    category,
    tags = [],
    content,
    featured = false,
    draft = false,
    slug: slugOverride,
  } = body as {
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
    content?: string;
    featured?: boolean;
    draft?: boolean;
    slug?: string;
  };

  if (!title?.trim() || !description?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "Title, description, and content are required." },
      { status: 400 }
    );
  }

  if (!category || !(CATEGORY_SLUGS as readonly string[]).includes(category)) {
    return NextResponse.json({ error: "A valid category is required." }, { status: 400 });
  }

  const slug = slugify(slugOverride?.trim() || title);
  if (!slug) {
    return NextResponse.json({ error: "Couldn't derive a valid slug from that title." }, { status: 400 });
  }

  const cleanTags = Array.isArray(tags) ? tags.map((t) => t.trim()).filter(Boolean) : [];
  const date = localDateString();
  const coverImage = `/covers/${slug}.svg`;

  const frontmatter = [
    "---",
    `title: ${yamlString(title.trim())}`,
    `description: ${yamlString(description.trim())}`,
    `date: ${yamlString(date)}`,
    `category: ${yamlString(category)}`,
    `tags: ${yamlStringArray(cleanTags)}`,
    `coverImage: ${yamlString(coverImage)}`,
    `featured: ${featured ? "true" : "false"}`,
    `draft: ${draft ? "true" : "false"}`,
    "---",
    "",
  ].join("\n");

  const fileContents = `${frontmatter}${content.trim()}\n`;
  const coverSvg = generatePostCoverSvg(title.trim(), category);
  const postRelPath = `content/posts/${slug}.mdx`;
  const coverRelPath = `public/covers/${slug}.svg`;

  if (isDev) {
    const postsDir = path.join(process.cwd(), "content", "posts");
    const coversDir = path.join(process.cwd(), "public", "covers");
    const postPath = path.join(postsDir, `${slug}.mdx`);
    const coverPath = path.join(coversDir, `${slug}.svg`);

    if (await fileExists(postPath)) {
      return NextResponse.json(
        { error: `A post with the slug "${slug}" already exists. Try a different title or slug.` },
        { status: 409 }
      );
    }

    await mkdir(postsDir, { recursive: true });
    await mkdir(coversDir, { recursive: true });
    await writeFile(postPath, fileContents, { flag: "wx" });
    await writeFile(coverPath, coverSvg, { flag: "wx" });

    // content-collections rebuilds its generated cache asynchronously off this file
    // change, and that rewrite isn't atomic — if a route compiles while it's still
    // mid-write, the dev server throws a syntax error until the next full restart.
    // Waiting here gives the rebuild (~3s observed) room to finish before the
    // client is told it's safe to navigate to the new post.
    await new Promise((resolve) => setTimeout(resolve, 3500));
  } else {
    try {
      if (await githubFileExists(postRelPath)) {
        return NextResponse.json(
          { error: `A post with the slug "${slug}" already exists. Try a different title or slug.` },
          { status: 409 }
        );
      }
      await createGitHubFile(postRelPath, fileContents, `Add post: ${title.trim()}`);
      await createGitHubFile(coverRelPath, coverSvg, `Add cover for: ${title.trim()}`);
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Failed to save via GitHub." },
        { status: 502 }
      );
    }
  }

  // The locally-loaded "content-collections" data won't include this post until
  // the next build (immediately in dev, or after Vercel's auto-redeploy in
  // production) — inject today's date explicitly so the streak reflects this
  // save right away regardless.
  const postDates = [...getAllPosts().map((p) => p.date), date];
  const streak = computeStreakStats(postDates);

  return NextResponse.json(
    { slug, coverImage, url: `/blog/${slug}`, streak, viaGitHub: !isDev },
    { status: 201 }
  );
}
