export const siteConfig = {
  name: "Learning in Public",
  shortName: "LiP",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://learninginpublic.dev",
  ogImage: "/og/default.png",
  description:
    "I document everything I learn — from software engineering and AI to books, startups, productivity, and everyday life.",
  tagline: "Software, AI, startups, books, and everything in between",
  author: {
    name: "Your Name",
    handle: "yourname",
    role: "Founder, Engineer & Writer",
    bio: "I build things, read too many books, and write down what I learn along the way. Currently building 0waste — and documenting the whole thing here.",
    avatar: "/authors/avatar.svg",
    email: "hello@learninginpublic.dev",
    location: "India",
  },
  links: {
    github: "https://github.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
    twitter: "https://x.com/yourname",
    instagram: "https://instagram.com/yourname",
  },
  nav: [
    { label: "Blog", href: "/blog" },
    { label: "Books", href: "/books" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
    {
      title: "Explore",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Books", href: "/books" },
        { label: "Projects", href: "/projects" },
        { label: "Archive", href: "/archive" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "About Me", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "RSS Feed", href: "/rss.xml" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
      ],
    },
  ],
  keywords: [
    "software engineering",
    "artificial intelligence",
    "startup journey",
    "book summaries",
    "productivity",
    "personal blog",
    "learning in public",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
