/** Backend URL for POST /api/leads (used by the Next.js proxy route only). Null when API_URL is unset. */
export function getLeadsApiUrl(): string | null {
  const base = process.env.API_URL?.trim().replace(/\/$/, "");
  return base ? `${base}/api/leads` : null;
}
