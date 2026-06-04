import { NextResponse } from "next/server";
import { getLeadsApiUrl } from "@/lib/api-url";

function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }

  return request.headers.get("x-real-ip");
}

export async function POST(request: Request) {
  const backendUrl = getLeadsApiUrl();
  const body = await request.text();
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
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }

  const responseBody = await backendResponse.text();

  return new NextResponse(responseBody, {
    status: backendResponse.status,
    headers: {
      "Content-Type": backendResponse.headers.get("Content-Type") ?? "application/json",
    },
  });
}
