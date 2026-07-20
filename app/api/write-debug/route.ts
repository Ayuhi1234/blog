import { NextResponse } from "next/server";

// Temporary diagnostic route — reports only presence/length of each required
// env var, never the actual values. Safe to expose; remove once debugging is done.
export async function GET() {
  const pw = process.env.WRITE_PASSWORD ?? "";
  const token = process.env.GITHUB_TOKEN ?? "";
  const repo = process.env.GITHUB_REPO ?? "";

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    WRITE_PASSWORD: { present: Boolean(pw), length: pw.length },
    GITHUB_TOKEN: { present: Boolean(token), length: token.length },
    GITHUB_REPO: { present: Boolean(repo), value: repo || null },
  });
}
