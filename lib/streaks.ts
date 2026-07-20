import { localDateString } from "@/lib/format";

export type HeatmapDay = { date: string; count: number };

export type StreakStats = {
  currentStreak: number;
  longestStreak: number;
  totalPosts: number;
  daysActive: number;
  postedToday: boolean;
  today: string;
  heatmap: HeatmapDay[];
};

export const STREAK_MILESTONES = [3, 7, 14, 21, 30, 50, 75, 100, 150, 200, 365] as const;

export function isMilestone(streak: number) {
  return (STREAK_MILESTONES as readonly number[]).includes(streak);
}

function addDays(dateStr: string, delta: number) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + delta);
  return localDateString(date);
}

export function computeStreakStats(postDates: string[], heatmapDays = 140): StreakStats {
  const today = localDateString();
  const countByDay = new Map<string, number>();
  for (const date of postDates) {
    countByDay.set(date, (countByDay.get(date) ?? 0) + 1);
  }

  const postedToday = countByDay.has(today);

  let currentStreak = 0;
  let cursor = postedToday ? today : addDays(today, -1);
  while (countByDay.has(cursor)) {
    currentStreak += 1;
    cursor = addDays(cursor, -1);
  }

  const sortedDays = Array.from(countByDay.keys()).sort();
  let longestStreak = 0;
  let run = 0;
  let prevDay: string | null = null;
  for (const day of sortedDays) {
    if (prevDay && addDays(prevDay, 1) === day) {
      run += 1;
    } else {
      run = 1;
    }
    longestStreak = Math.max(longestStreak, run);
    prevDay = day;
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  const heatmap: HeatmapDay[] = [];
  for (let i = heatmapDays - 1; i >= 0; i--) {
    const date = addDays(today, -i);
    heatmap.push({ date, count: countByDay.get(date) ?? 0 });
  }

  return {
    currentStreak,
    longestStreak,
    totalPosts: postDates.length,
    daysActive: countByDay.size,
    postedToday,
    today,
    heatmap,
  };
}
