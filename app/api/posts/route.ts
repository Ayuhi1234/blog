import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { localDateString, slugify } from "@/lib/format";
import { generatePostCoverSvg } from "@/lib/generate-post-cover";
import { getAllPosts } from "@/lib/content";
import { computeStreakStats } from "@/lib/streaks";
import { fileExists } from "@/lib/fs-utils";

function yamlString(value: string) {
  return JSON.stringify(value);
}

function yamlStringArray(values: string[]) {
  return `[${values.map((v) => JSON.stringify(v)).join(", ")}]`;
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "The writer is a local-only tool and isn't available in production." },
      { status: 403 }
    );
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
    isEdit = false,
    coverImage: coverImageOverride,
  } = body as {
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
    content?: string;
    featured?: boolean;
    draft?: boolean;
    slug?: string;
    isEdit?: boolean;
    coverImage?: string;
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

  const slug = isEdit ? slugOverride?.trim() : slugify(slugOverride?.trim() || title);
  if (!slug) {
    return NextResponse.json({ error: "Couldn't derive a valid slug from that title." }, { status: 400 });
  }

  const postsDir = path.join(process.cwd(), "content", "posts");
  const coversDir = path.join(process.cwd(), "public", "covers");
  const postPath = path.join(postsDir, `${slug}.mdx`);
  const coverPath = path.join(coversDir, `${slug}.svg`);

  const today = localDateString();
  let publishDate = today;
  let updatedDate: string | undefined;

  if (isEdit) {
    const existingPost = getAllPosts().find((p) => p.slug === slug);
    if (!existingPost) {
      return NextResponse.json(
        { error: `No existing post found with slug "${slug}" to update.` },
        { status: 404 }
      );
    }
    publishDate = existingPost.date;
    updatedDate = today;
  } else if (await fileExists(postPath)) {
    return NextResponse.json(
      { error: `A post with the slug "${slug}" already exists. Try a different title or slug.` },
      { status: 409 }
    );
  }

  await mkdir(postsDir, { recursive: true });

  const cleanTags = Array.isArray(tags) ? tags.map((t) => t.trim()).filter(Boolean) : [];
  const useCustomCover = Boolean(coverImageOverride?.trim());
  const coverImage = useCustomCover ? coverImageOverride!.trim() : `/covers/${slug}.svg`;

  const frontmatterLines = [
    "---",
    `title: ${yamlString(title.trim())}`,
    `description: ${yamlString(description.trim())}`,
    `date: ${yamlString(publishDate)}`,
  ];
  if (updatedDate) frontmatterLines.push(`updated: ${yamlString(updatedDate)}`);
  frontmatterLines.push(
    `category: ${yamlString(category)}`,
    `tags: ${yamlStringArray(cleanTags)}`,
    `coverImage: ${yamlString(coverImage)}`,
    `featured: ${featured ? "true" : "false"}`,
    `draft: ${draft ? "true" : "false"}`,
    "---",
    ""
  );

  const fileContents = `${frontmatterLines.join("\n")}${content.trim()}\n`;
  const writeFlag = isEdit ? undefined : "wx";

  await writeFile(postPath, fileContents, writeFlag ? { flag: writeFlag } : undefined);

  if (!useCustomCover) {
    await mkdir(coversDir, { recursive: true });
    await writeFile(
      coverPath,
      generatePostCoverSvg(title.trim(), category),
      writeFlag ? { flag: writeFlag } : undefined
    );
  }

  // content-collections rebuilds its generated cache asynchronously off this file
  // change, and that rewrite isn't atomic — if a route compiles while it's still
  // mid-write, the dev server throws a syntax error until the next full restart.
  // Waiting here gives the rebuild (~3s observed) room to finish before the
  // client is told it's safe to navigate to the new post.
  await new Promise((resolve) => setTimeout(resolve, 3500));

  // Include today's date explicitly — the in-process "content-collections" module
  // binding may not have picked up this write yet depending on webpack's own
  // reload timing, and the streak must reflect today's writing activity regardless
  // (editing counts too — it's still writing).
  const currentPosts = getAllPosts();
  const postDates = [...currentPosts.map((p) => p.date), today];
  const streak = computeStreakStats(postDates);
  // The injected "today" entry above is only a genuinely new post when creating —
  // an edit overwrites a file already counted in currentPosts.
  streak.totalPosts = currentPosts.length + (isEdit ? 0 : 1);

  return NextResponse.json(
    { slug, coverImage, url: `/blog/${slug}`, streak, isEdit },
    { status: isEdit ? 200 : 201 }
  );
}
