import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "public");

const CATEGORY_GRADIENTS = {
  "software-engineering": ["#3b82f6", "#6366f1"],
  "artificial-intelligence": ["#8b5cf6", "#a855f7"],
  "book-summaries": ["#f59e0b", "#f97316"],
  productivity: ["#10b981", "#14b8a6"],
  "life-lessons": ["#f43f5e", "#ec4899"],
  startups: ["#f97316", "#ef4444"],
  career: ["#06b6d4", "#3b82f6"],
  travel: ["#0ea5e9", "#06b6d4"],
  "personal-journal": ["#d946ef", "#8b5cf6"],
  "random-thoughts": ["#64748b", "#71717a"],
};

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrapText(text, maxCharsPerLine) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function postCover({ title, category, id }) {
  const [c1, c2] = CATEGORY_GRADIENTS[category] ?? ["#3b82f6", "#8b5cf6"];
  const w = 1600;
  const h = 900;
  const lines = wrapText(title, 22).slice(0, 4);
  const lineHeight = 76;
  const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2 + 24;

  const svg = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="r${id}" cx="20%" cy="15%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots${id}" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.6" fill="#ffffff" fill-opacity="0.16"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${id})"/>
  <rect width="${w}" height="${h}" fill="url(#dots${id})"/>
  <rect width="${w}" height="${h}" fill="url(#r${id})"/>
  <circle cx="1360" cy="760" r="260" fill="#ffffff" fill-opacity="0.08"/>
  <circle cx="140" cy="120" r="160" fill="#ffffff" fill-opacity="0.10"/>
  <text x="90" y="${startY}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="#ffffff" letter-spacing="-1.5">
    ${lines.map((line, i) => `<tspan x="90" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`).join("")}
  </text>
  <text x="90" y="${h - 64}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#ffffff" fill-opacity="0.85" letter-spacing="2">${escapeXml(category.replace(/-/g, " ").toUpperCase())}</text>
</svg>`;
  return svg;
}

function bookCover({ title, author, id, seed }) {
  const palette = [
    ["#f59e0b", "#f97316"],
    ["#6366f1", "#8b5cf6"],
    ["#10b981", "#14b8a6"],
    ["#ef4444", "#f97316"],
    ["#0ea5e9", "#6366f1"],
  ];
  const [c1, c2] = palette[seed % palette.length];
  const w = 640;
  const h = 960;
  const lines = wrapText(title, 15).slice(0, 5);
  const lineHeight = 46;
  const startY = 420 - ((lines.length - 1) * lineHeight) / 2;

  const svg = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${id})"/>
  <rect x="0" y="0" width="18" height="${h}" fill="#000000" fill-opacity="0.18"/>
  <circle cx="${w - 90}" cy="120" r="140" fill="#ffffff" fill-opacity="0.12"/>
  <circle cx="90" cy="${h - 140}" r="110" fill="#ffffff" fill-opacity="0.10"/>
  <rect x="56" y="80" width="60" height="6" fill="#ffffff" fill-opacity="0.85"/>
  <text x="56" y="${startY}" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="700" fill="#ffffff">
    ${lines.map((line, i) => `<tspan x="56" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`).join("")}
  </text>
  <text x="56" y="${h - 64}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="24" fill="#ffffff" fill-opacity="0.9">${escapeXml(author)}</text>
</svg>`;
  return svg;
}

function projectCover({ title, id, seed }) {
  const palette = [
    ["#10b981", "#0ea5e9"],
    ["#8b5cf6", "#3b82f6"],
    ["#f97316", "#ec4899"],
    ["#06b6d4", "#6366f1"],
  ];
  const [c1, c2] = palette[seed % palette.length];
  const w = 1600;
  const h = 1000;
  const svg = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g${id}" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <pattern id="grid${id}" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#ffffff" stroke-opacity="0.09" stroke-width="1.5"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${id})"/>
  <rect width="${w}" height="${h}" fill="url(#grid${id})"/>
  <circle cx="1300" cy="200" r="220" fill="#ffffff" fill-opacity="0.10"/>
  <rect x="90" y="${h - 190}" width="120" height="120" rx="28" fill="#ffffff" fill-opacity="0.16"/>
  <text x="90" y="${h - 240}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="52" font-weight="700" fill="#ffffff" letter-spacing="-1">${escapeXml(title)}</text>
</svg>`;
  return svg;
}

const posts = [
  { id: "react-server-components", title: "A Deep Dive into React Server Components", category: "software-engineering" },
  { id: "rewrote-blog-three-times", title: "Why I Rewrote My Blog Three Times", category: "software-engineering" },
  { id: "llm-agent-stack-2026", title: "The LLM Agent Stack in 2026", category: "artificial-intelligence" },
  { id: "atomic-habits-summary", title: "Atomic Habits: Everything Worth Remembering", category: "book-summaries" },
  { id: "productivity-system", title: "The Productivity System That Finally Stuck", category: "productivity" },
  { id: "lessons-at-22", title: "Everything I Wish I Knew at 22", category: "life-lessons" },
  { id: "quit-job-for-0waste", title: "Why I Quit My Job to Build 0waste", category: "startups" },
  { id: "negotiate-first-offer", title: "How to Negotiate Your First Engineering Offer", category: "career" },
  { id: "himalayas-slow-down", title: "Three Weeks in the Himalayas", category: "travel" },
  { id: "learning-in-public", title: "How I Actually Learn in Public", category: "personal-journal" },
  { id: "talking-to-yourself-founder", title: "On Talking to Yourself Like a Founder", category: "random-thoughts" },
];

const books = [
  { id: "atomic-habits", title: "Atomic Habits", author: "James Clear", seed: 0 },
  { id: "the-lean-startup", title: "The Lean Startup", author: "Eric Ries", seed: 1 },
  { id: "deep-work", title: "Deep Work", author: "Cal Newport", seed: 2 },
  { id: "zero-to-one", title: "Zero to One", author: "Peter Thiel", seed: 3 },
  { id: "thinking-fast-and-slow", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", seed: 4 },
];

const projects = [
  { id: "0waste", title: "0waste", seed: 0 },
  { id: "learning-in-public", title: "Learning in Public", seed: 1 },
  { id: "devmetrics-cli", title: "DevMetrics CLI", seed: 2 },
  { id: "focused", title: "Focused", seed: 3 },
];

mkdirSync(join(root, "covers"), { recursive: true });
mkdirSync(join(root, "books"), { recursive: true });
mkdirSync(join(root, "projects"), { recursive: true });

for (const post of posts) {
  writeFileSync(join(root, "covers", `${post.id}.svg`), postCover({ ...post, id: post.id }));
}
for (const book of books) {
  writeFileSync(join(root, "books", `${book.id}.svg`), bookCover({ ...book, id: book.id }));
}
for (const project of projects) {
  writeFileSync(join(root, "projects", `${project.id}.svg`), projectCover({ ...project, id: project.id }));
}

console.log(`Generated ${posts.length} post covers, ${books.length} book covers, ${projects.length} project covers.`);
