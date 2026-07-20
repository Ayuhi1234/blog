"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function NavLinks({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {siteConfig.nav.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "relative px-3.5 py-2 text-sm font-medium transition-colors rounded-full",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="navbar-active-pill"
                className="absolute inset-0 rounded-full bg-muted"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
