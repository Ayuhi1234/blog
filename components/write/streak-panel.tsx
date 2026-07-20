"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, PartyPopper, Trophy, CalendarDays, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { isMilestone, type StreakStats } from "@/lib/streaks";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function buildWeeks(heatmap: StreakStats["heatmap"]) {
  if (!heatmap.length) return [];
  const firstDay = new Date(`${heatmap[0].date}T00:00:00`).getDay();
  const padded: (StreakStats["heatmap"][number] | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...heatmap,
  ];
  while (padded.length % 7 !== 0) padded.push(null);

  const weeks: (StreakStats["heatmap"][number] | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

function cellClass(count: number, isToday: boolean) {
  return cn(
    "size-[11px] rounded-[3px] transition-colors",
    count === 0 && "bg-muted",
    count === 1 && "bg-brand-emerald/50",
    count >= 2 && "bg-brand-emerald",
    isToday && "ring-2 ring-brand-purple ring-offset-1 ring-offset-background"
  );
}

export function StreakPanel({
  streak,
  celebrate = false,
}: {
  streak: StreakStats;
  celebrate?: boolean;
}) {
  const weeks = useMemo(() => buildWeeks(streak.heatmap), [streak.heatmap]);
  const weekLabels = useMemo(() => {
    const months = weeks.map((week) => {
      const firstReal = week.find((d) => d !== null);
      return firstReal ? MONTH_LABELS[new Date(`${firstReal.date}T00:00:00`).getMonth()] : null;
    });
    return months.map((month, i) => (month && month !== months[i - 1] ? month : null));
  }, [weeks]);
  const milestone = celebrate && isMilestone(streak.currentStreak) && streak.postedToday;

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <motion.div
            animate={
              milestone
                ? { scale: [1, 1.35, 0.95, 1.15, 1], rotate: [0, -8, 8, -4, 0] }
                : streak.postedToday
                  ? { scale: [1, 1.08, 1] }
                  : {}
            }
            transition={
              milestone
                ? { duration: 0.9, ease: "easeInOut" }
                : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
            className={cn(
              "flex size-14 shrink-0 items-center justify-center rounded-2xl",
              streak.postedToday
                ? "bg-gradient-to-br from-orange-400 to-red-500 text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Flame className="size-7" fill={streak.postedToday ? "currentColor" : "none"} />
          </motion.div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight">{streak.currentStreak}</span>
              <span className="text-sm font-medium text-muted-foreground">
                day{streak.currentStreak === 1 ? "" : "s"} streak
              </span>
              {milestone && (
                <motion.span
                  initial={{ opacity: 0, y: -6, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="ml-1 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-400 to-brand-purple px-2.5 py-0.5 text-xs font-semibold text-white"
                >
                  <PartyPopper className="size-3" />
                  Milestone!
                </motion.span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {streak.postedToday
                ? "You've posted today — streak is safe."
                : streak.currentStreak > 0
                  ? "Write today to keep it alive."
                  : "Publish today to start a new streak."}
            </p>
          </div>
        </div>

        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="size-4 text-amber-500" />
            <div>
              <div className="font-semibold">{streak.longestStreak}</div>
              <div className="text-xs text-muted-foreground">Best streak</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-brand-blue" />
            <div>
              <div className="font-semibold">{streak.totalPosts}</div>
              <div className="text-xs text-muted-foreground">Total posts</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-brand-purple" />
            <div>
              <div className="font-semibold">{streak.daysActive}</div>
              <div className="text-xs text-muted-foreground">Days active</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => {
            const label = weekLabels[wi];
            return (
              <div key={wi} className="relative flex flex-col gap-[3px]">
                {label && (
                  <span className="absolute -top-4 left-0 text-[10px] text-muted-foreground">
                    {label}
                  </span>
                )}
                {week.map((day, di) =>
                  day ? (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} post${day.count === 1 ? "" : "s"}`}
                      className={cellClass(day.count, day.date === streak.today)}
                    />
                  ) : (
                    <div key={di} className="size-[11px]" />
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
