import { NextResponse } from "next/server";
import { runMockAgent, runOpenAIAgent } from "@/lib/agent";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message too long" },
        { status: 400 }
      );
    }

    const useMock = process.env.AGENT_DEMO_MODE === "mock";

    const result = useMock
      ? runMockAgent(message)
      : await runOpenAIAgent(message);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
