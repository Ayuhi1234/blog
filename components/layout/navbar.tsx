"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { PenLine } from "lucide-react";
import { NavLinks } from "@/components/layout/nav-links";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchTrigger } from "@/components/layout/search-trigger";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        scrolled ? "glass-nav border-b border-border/60 shadow-sm" : "border-b border-transparent"
      )}
    >
      <div className="container-premium flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue via-brand-purple to-brand-emerald text-sm font-bold text-white">
            {siteConfig.shortName}
          </span>
          <span className="hidden text-[15px] sm:inline">{siteConfig.name}</span>
        </Link>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="hidden rounded-full bg-gradient-to-br from-brand-blue via-brand-purple to-brand-emerald text-white hover:opacity-90 sm:flex"
            render={<Link href="/write" />}
          >
            <PenLine className="size-3.5" />
            Write
          </Button>
          <SearchTrigger compact className="sm:hidden" />
          <SearchTrigger className="hidden sm:flex" />
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
