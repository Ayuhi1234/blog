"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function WriteAuthGate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/write-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Incorrect password.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center py-24 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue via-brand-purple to-brand-emerald text-white">
        <Lock className="size-6" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">This page is locked</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter the passcode to write a new post.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 w-full space-y-3">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passcode"
          autoFocus
          required
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Unlock"}
        </Button>
      </form>
    </div>
  );
}
