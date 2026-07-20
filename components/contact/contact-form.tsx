"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 900);
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-emerald/30 bg-brand-emerald-soft px-6 py-16 text-center">
        <CheckCircle2 className="size-10 text-brand-emerald" />
        <h3 className="mt-4 text-xl font-semibold">Message sent</h3>
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          Thanks for reaching out — I read every message and try to reply within a
          few days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="jane@example.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" required placeholder="What's this about?" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required rows={6} placeholder="Say hello…" />
      </div>
      <Button type="submit" size="lg" className="h-11 w-full rounded-full sm:w-auto sm:px-8" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send Message"}
        {status !== "loading" && <Send className="size-4" />}
      </Button>
    </form>
  );
}
