import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Pre } from "@/components/mdx/pre";
import { Callout } from "@/components/mdx/callout";

function MDXLink({ href = "", children, ...props }: ComponentProps<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function MDXImage({ src, alt }: ComponentProps<"img">) {
  if (!src || typeof src !== "string") return null;
  return (
    <span className="not-prose my-8 block">
      <span className="relative block aspect-video w-full overflow-hidden rounded-2xl border border-border">
        <Image src={src} alt={alt ?? ""} fill className="object-cover" />
      </span>
      {alt && (
        <span className="mt-2.5 block text-center text-sm text-muted-foreground">{alt}</span>
      )}
    </span>
  );
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="not-prose my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  a: MDXLink,
  img: MDXImage,
  pre: Pre,
  Callout,
  Figure,
};
