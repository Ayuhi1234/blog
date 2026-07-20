"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Loader2, RotateCcw, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/categories";
import { slugify } from "@/lib/format";
import type { StreakStats } from "@/lib/streaks";
import { StreakPanel } from "@/components/write/streak-panel";

const DEFAULT_CONTENT = `Start writing here. Standard Markdown works — headings, **bold**, _italics_, lists, > blockquotes, and \`inline code\`.

## A heading

Write the way you'd write anywhere else. This preview renders plain Markdown; the published post also supports this site's custom <Callout> and <Figure> components — they won't render specially here, but will on the live post.
`;

type Status = "idle" | "saving" | "success" | "error";

export function PostEditor({
  existingSlugs,
  tagSuggestions,
  initialStreak,
}: {
  existingSlugs: string[];
  tagSuggestions: string[];
  initialStreak: StreakStats;
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [draft, setDraft] = useState(false);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{ slug: string; url: string } | null>(null);
  const [streak, setStreak] = useState<StreakStats>(initialStreak);

  const effectiveSlug = slugEdited ? slug : slugify(title);
  const slugCollision = existingSlugs.includes(effectiveSlug);
  const tags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  }

  function handleReset() {
    setTitle("");
    setSlug("");
    setSlugEdited(false);
    setDescription("");
    setCategory("");
    setTagsInput("");
    setFeatured(false);
    setDraft(false);
    setContent(DEFAULT_CONTENT);
    setStatus("idle");
    setMessage("");
    setResult(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !category || !content.trim()) {
      setStatus("error");
      setMessage("Fill in title, description, category, and content before saving.");
      return;
    }
    if (slugCollision) {
      setStatus("error");
      setMessage(`A post with the slug "${effectiveSlug}" already exists — try a different title or slug.`);
      return;
    }

    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          tags,
          content,
          featured,
          draft,
          slug: effectiveSlug,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      setResult({ slug: data.slug, url: data.url });
      if (data.streak) setStreak(data.streak);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success" && result) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center rounded-3xl border border-brand-emerald/30 bg-brand-emerald-soft px-8 py-14 text-center">
          <CheckCircle2 className="size-12 text-brand-emerald" />
          <h1 className="mt-5 text-2xl font-semibold">
            Saved to content/posts/{result.slug}.mdx
          </h1>
          <p className="mt-2 text-muted-foreground">
            {draft
              ? "Saved as a draft — flip draft to false in the file when it's ready to publish."
              : "It's written. Commit and push whenever you're ready to ship it."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button render={<Link href={result.url} target="_blank" rel="noreferrer" />}>
              View Post
              <ExternalLink className="size-4" />
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="size-4" />
              Write Another
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <StreakPanel streak={streak} celebrate />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="pb-24">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Write</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Saves straight to <code className="rounded bg-muted px-1.5 py-0.5">content/posts/</code>.
            Commit whenever you&apos;re ready to publish.
          </p>
        </div>
        <Button type="submit" size="lg" className="rounded-full px-6" disabled={status === "saving"}>
          {status === "saving" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              Save Post
            </>
          )}
        </Button>
      </div>

      <div className="mb-8">
        <StreakPanel streak={streak} />
      </div>

      {status === "error" && message && (
        <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {message}
        </div>
      )}

      <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2 sm:col-span-2 lg:col-span-2">
          <Label htmlFor="post-title">Title</Label>
          <Input
            id="post-title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="What did you learn today?"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="post-slug">Slug</Label>
          <Input
            id="post-slug"
            value={effectiveSlug}
            onChange={(e) => {
              setSlugEdited(true);
              setSlug(slugify(e.target.value));
            }}
            placeholder="auto-generated"
          />
          {slugCollision && <p className="text-xs text-destructive">Already exists</p>}
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(value) => setCategory(value ?? "")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2 lg:col-span-3">
          <Label htmlFor="post-description">Description</Label>
          <Input
            id="post-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="One or two sentences for the card and SEO."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="post-tags">Tags</Label>
          <Input
            id="post-tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="comma, separated"
          />
        </div>

        {tags.length > 0 && (
          <div className="-mt-2 flex flex-wrap gap-1.5 sm:col-span-2 lg:col-span-4">
            {tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        )}
        {tagSuggestions.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:col-span-2 lg:col-span-4">
            Reuse a tag:
            {tagSuggestions.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTagsInput((prev) => (prev ? `${prev}, ${t}` : t))}
                className="rounded-full border border-border px-2 py-0.5 transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <Switch checked={featured} onCheckedChange={setFeatured} />
          <Label>Featured</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={draft} onCheckedChange={setDraft} />
          <Label>Save as draft</Label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="post-content">Content (Markdown / MDX)</Label>
            <span className="text-xs text-muted-foreground">
              {wordCount} words · {readingTime} min read
            </span>
          </div>
          <Textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-[560px] field-sizing-fixed resize-none overflow-y-auto font-mono text-sm leading-relaxed"
          />
        </div>
        <div>
          <Label className="mb-2 block">Live Preview</Label>
          <div className="prose-premium h-[560px] overflow-y-auto rounded-2xl border border-border bg-background p-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </form>
  );
}
