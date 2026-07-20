"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
    }, 700);
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-emerald-soft px-4 py-2.5 text-sm font-medium text-foreground",
          className
        )}
      >
        <Check className="size-4 text-brand-emerald" />
        You&apos;re on the list. Talk soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full max-w-md gap-2", className)}>
      <Input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 flex-1 rounded-full bg-background px-4"
        aria-label="Email address"
      />
      <Button type="submit" size="lg" className="h-11 shrink-0 rounded-full" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : "Subscribe"}
        {status !== "loading" && <ArrowRight className="size-4" />}
      </Button>
    </form>
  );
}
