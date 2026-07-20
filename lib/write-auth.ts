import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "write_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSecret() {
  const secret = process.env.WRITE_PASSWORD;
  if (!secret) throw new Error("WRITE_PASSWORD is not configured.");
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isWriteEnabledInProduction() {
  return Boolean(
    process.env.WRITE_PASSWORD && process.env.GITHUB_TOKEN && process.env.GITHUB_REPO
  );
}

/** Whether the /write page is reachable at all right now: always in dev, or in
 * production once WRITE_PASSWORD/GITHUB_TOKEN/GITHUB_REPO are configured. */
export function isWriteAvailable() {
  return process.env.NODE_ENV !== "production" || isWriteEnabledInProduction();
}

export function checkPassword(password: string) {
  if (!process.env.WRITE_PASSWORD) return false;
  return safeEqual(password, process.env.WRITE_PASSWORD);
}

export function createSessionCookieValue() {
  const expiry = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = String(expiry);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionCookieValue(value: string | undefined | null) {
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  if (Number(payload) < Date.now()) return false;
  try {
    return safeEqual(sign(payload), signature);
  } catch {
    return false;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
