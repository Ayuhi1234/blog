"use client";

import { useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pre({ className, children, ...props }: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = ref.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className={cn(
          "absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-lg border border-border/60 bg-card/80 text-muted-foreground opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:text-foreground cursor-pointer",
          copied && "opacity-100"
        )}
      >
        {copied ? <Check className="size-3.5 text-brand-emerald" /> : <Copy className="size-3.5" />}
      </button>
      <pre ref={ref} className={cn(className, "scrollbar-thin")} {...props}>
        {children}
      </pre>
    </div>
  );
}
