const DEFAULT_API_URL = "https://mavscan-backend.onrender.com";

/** Backend URL for POST /api/leads (used by the Next.js proxy route only). */
export function getLeadsApiUrl(): string {
  const base = (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/$/, "");
  return `${base}/api/leads`;
}
