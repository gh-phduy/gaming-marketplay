import { NextResponse } from "next/server";

const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const response = await fetch(`${backendApiUrl}/api/sellers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Failed to sync seller profile to backend", error);
    return NextResponse.json(
      { error: "Backend seller API is unavailable" },
      { status: 503 },
    );
  }
}
