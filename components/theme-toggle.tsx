"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

const OPTIONS = [
  { value: "light", icon: Sun, label: "Light theme" },
  { value: "system", icon: Monitor, label: "System theme" },
  { value: "dark", icon: Moon, label: "Dark theme" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const active = mounted ? theme ?? "system" : "system";

  return (
    <div className="relative flex items-center gap-0.5 rounded-full border border-border/70 bg-muted/40 p-1">
      {OPTIONS.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-label={opt.label}
            aria-pressed={isActive}
            onClick={() => setTheme(opt.value)}
            className={cn(
              "relative z-10 flex size-6 items-center justify-center rounded-full transition-colors cursor-pointer",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="theme-toggle-active"
                className="absolute inset-0 rounded-full bg-background shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 34 }}
              />
            )}
            <opt.icon className="relative z-10 size-3.5" />
          </button>
        );
      })}
    </div>
  );
}

export function ThemeToggleSimple() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex size-9 items-center justify-center rounded-full border border-border/70 bg-muted/40 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && resolvedTheme === "dark" ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="size-4" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="size-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
