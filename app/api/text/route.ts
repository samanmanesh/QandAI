import { generateQA } from "@/app/lib/anthropic";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  console.log("hit /api/text");
  const { text } = await request.json();

  try {
    const result = await generateQA(text);
    console.log("result in api/text", result);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate Q&A" },
      { status: 500 }
    );
  }
}
