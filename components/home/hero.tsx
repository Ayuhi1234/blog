"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/motion/counter";

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { label: "Essays published", value: 11, suffix: "+" },
  { label: "Categories covered", value: 10 },
  { label: "Books reviewed", value: 5, suffix: "+" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-aurora pointer-events-none absolute inset-0" />
      <div className="bg-mesh pointer-events-none absolute inset-0" />

      <motion.div
        className="pointer-events-none absolute left-[8%] top-24 size-24 rounded-full bg-brand-blue/20 blur-2xl"
        animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] top-40 size-32 rounded-full bg-brand-purple/20 blur-2xl"
        animate={{ y: [0, 22, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-24 left-[20%] size-20 rounded-full bg-brand-emerald/20 blur-2xl"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container-premium relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
        >
          <Sparkles className="size-3.5 text-brand-purple" />
          Software · AI · Startups · Books · Life
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="max-w-4xl text-balance font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="text-gradient">Learning</span> in Public
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          I document everything I learn — from software engineering and AI to
          books, startups, productivity, and everyday life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="h-12 rounded-full px-7 text-base"
            render={<Link href="/blog" />}
          >
            Read Blogs
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-7 text-base"
            render={<Link href="/about" />}
          >
            About Me
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-8"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                <Counter value={stat.value} suffix={stat.suffix ?? ""} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5 text-muted-foreground/60" />
        </motion.div>
      </div>
    </section>
  );
}
