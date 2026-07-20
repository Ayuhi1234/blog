export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function formatDateShort(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateISO(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString();
}

export function getYear(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.getFullYear();
}

export function getMonthLabel(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { month: "long" });
}

export function localDateString(date: Date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function slugifyTag(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function unslugifyTag(slug: string) {
  return slug.replace(/-/g, " ");
}
