import { NextResponse } from "next/server";
import { getLeadsApiUrl } from "@/lib/api-url";

// Render free tier can take ~30s+ to wake from a cold start.
const BACKEND_TIMEOUT_MS = 45_000;
const MAX_BODY_BYTES = 10_000;
const REQUIRED_FIELDS = [
  ["fullName", "Full name"],
  ["email", "Email"],
  ["country", "Country"],
] as const;

function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }

  return request.headers.get("x-real-ip");
}

function errorResponse(status: number, message: string) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(request: Request) {
  const backendUrl = getLeadsApiUrl();
  if (!backendUrl) {
    console.error("[api/leads] API_URL is not set");
    return errorResponse(500, "Something went wrong on our end. Please try again shortly.");
  }

  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return errorResponse(413, "Request too large.");
  }

  const body = await request.text();
  if (body.length > MAX_BODY_BYTES) {
    return errorResponse(413, "Request too large.");
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return errorResponse(400, "Invalid request. Please refresh the page and try again.");
  }

  if (typeof payload !== "object" || payload === null) {
    return errorResponse(400, "Invalid request. Please refresh the page and try again.");
  }

  const fields = payload as Record<string, unknown>;
  const errors = REQUIRED_FIELDS.filter(
    ([key]) => typeof fields[key] !== "string" || !(fields[key] as string).trim(),
  ).map(([, label]) => `${label} is required.`);

  if (errors.length > 0) {
    return NextResponse.json({ success: false, message: "Invalid input", errors }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (clientIp) {
    headers["X-Forwarded-For"] = clientIp;
    headers["X-Real-IP"] = clientIp;
  }

  let backendResponse: Response;

  try {
    backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      console.error(`[api/leads] backend timed out after ${BACKEND_TIMEOUT_MS}ms`);
      return errorResponse(504, "Our server is taking too long to respond. Please try again in a moment.");
    }

    console.error("[api/leads] backend unreachable:", err);
    return errorResponse(502, "We couldn't reach our server. Please try again shortly.");
  }

  if (backendResponse.status >= 500) {
    console.error(`[api/leads] backend returned ${backendResponse.status}`);
    return errorResponse(502, "Something went wrong on our end. Please try again shortly.");
  }

  let data: unknown;
  try {
    data = await backendResponse.json();
  } catch {
    console.error(`[api/leads] backend returned non-JSON (status ${backendResponse.status})`);
    return errorResponse(502, "Something went wrong on our end. Please try again shortly.");
  }

  const retryAfter = backendResponse.headers.get("Retry-After");

  return NextResponse.json(data, {
    status: backendResponse.status,
    headers: retryAfter ? { "Retry-After": retryAfter } : undefined,
  });
}
