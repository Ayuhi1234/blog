import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileExists } from "@/lib/fs-utils";
import { slugify } from "@/lib/format";

const ALLOWED_TYPES: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

const MAX_SIZE = 8 * 1024 * 1024; // 8MB

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Image uploads only work when running locally." },
      { status: 403 }
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Unsupported image type. Use PNG, JPEG, WebP, GIF, or SVG." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Image is too large (8MB max)." }, { status: 400 });
  }

  const originalExt = path.extname(file.name);
  const baseName = slugify(path.basename(file.name, originalExt)) || "image";
  const uploadsDir = path.join(process.cwd(), "public", "images", "posts");
  await mkdir(uploadsDir, { recursive: true });

  let filename = `${baseName}${ext}`;
  let counter = 1;
  while (await fileExists(path.join(uploadsDir, filename))) {
    filename = `${baseName}-${counter}${ext}`;
    counter += 1;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), buffer);

  return NextResponse.json(
    { path: `/images/posts/${filename}`, filename },
    { status: 201 }
  );
}
