import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Log the metrics data server-side
    console.log("[METRICS]", {
      timestamp: new Date().toISOString(),
      data: body,
      headers: {
        userAgent: request.headers.get("user-agent"),
        referer: request.headers.get("referer"),
        origin: request.headers.get("origin"),
      }
    });
    
    // Return success response
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[METRICS ERROR]", error);
    
    // Still return success to avoid breaking the client
    return NextResponse.json({ ok: true });
  }
}
