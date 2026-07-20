import { CATEGORY_OG_COLORS, DEFAULT_OG_COLORS } from "@/lib/og-colors";

function escapeXml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrapText(text: string, maxCharsPerLine: number) {
  const words = text.split(" ");
  const lines: string[] = [];
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

export function generatePostCoverSvg(title: string, category: string) {
  const [c1, c2] = CATEGORY_OG_COLORS[category] ?? DEFAULT_OG_COLORS;
  const w = 1600;
  const h = 900;
  const id = Math.random().toString(36).slice(2, 8);
  const lines = wrapText(title, 22).slice(0, 4);
  const lineHeight = 76;
  const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2 + 24;

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
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
}
