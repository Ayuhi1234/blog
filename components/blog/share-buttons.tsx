"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { XIcon, LinkedinIcon } from "@/components/icons/social-icons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-medium text-muted-foreground">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Share on X"
        className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        <XIcon className="size-3.5" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Share on LinkedIn"
        className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        <LinkedinIcon className="size-3.5" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground cursor-pointer"
      >
        {copied ? <Check className="size-3.5 text-brand-emerald" /> : <Link2 className="size-3.5" />}
      </button>
    </div>
  );
}
