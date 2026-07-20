export type CategorySlug =
  | "software-engineering"
  | "artificial-intelligence"
  | "book-summaries"
  | "productivity"
  | "life-lessons"
  | "startups"
  | "career"
  | "travel"
  | "personal-journal"
  | "random-thoughts";

export type CategoryMeta = {
  slug: CategorySlug;
  label: string;
  description: string;
  icon: string;
  gradient: string;
};

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "software-engineering",
    label: "Software Engineering",
    description: "Code, architecture, and the craft of building things that last.",
    icon: "Code2",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    slug: "artificial-intelligence",
    label: "Artificial Intelligence",
    description: "Notes from the frontier — models, agents, and what they mean for us.",
    icon: "Sparkles",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    slug: "book-summaries",
    label: "Book Summaries",
    description: "The best ideas from the books worth your time, distilled.",
    icon: "BookOpen",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    slug: "productivity",
    label: "Productivity",
    description: "Systems and habits for doing meaningful work without burning out.",
    icon: "Zap",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    slug: "life-lessons",
    label: "Life Lessons",
    description: "Things I learned the hard way, so you don't have to.",
    icon: "Lightbulb",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    slug: "startups",
    label: "Startups",
    description: "Building 0waste.co.in in public — the wins, the failures, the math.",
    icon: "Rocket",
    gradient: "from-orange-500 to-red-500",
  },
  {
    slug: "career",
    label: "Career",
    description: "Growth, negotiation, and navigating a career with intention.",
    icon: "TrendingUp",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    slug: "travel",
    label: "Travel",
    description: "Places I've been, and what they taught me.",
    icon: "Plane",
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    slug: "personal-journal",
    label: "Personal Journal",
    description: "Unfiltered, occasionally unpolished — a running journal.",
    icon: "NotebookPen",
    gradient: "from-fuchsia-500 to-violet-500",
  },
  {
    slug: "random-thoughts",
    label: "Random Thoughts",
    description: "Whatever's on my mind that didn't fit anywhere else.",
    icon: "Shuffle",
    gradient: "from-slate-500 to-zinc-500",
  },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];

export function getCategory(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
