import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-aurora container-premium flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue via-brand-purple to-brand-emerald text-white">
        <Compass className="size-7" />
      </div>
      <p className="mt-8 text-8xl font-bold tracking-tight text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        This page wandered off
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist, moved, or never did. Let&apos;s
        get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button render={<Link href="/" />} className="h-11 rounded-full px-6">
          Back Home
          <ArrowRight className="size-4" />
        </Button>
        <Button render={<Link href="/blog" />} variant="outline" className="h-11 rounded-full px-6">
          Browse the Blog
        </Button>
      </div>
    </div>
  );
}
