import { NextResponse } from "next/server";

export async function POST(request) : Promise<Response> {
  console.log("hit /api/text");
  const { text } = await request.json();
  console.log(text);

  return NextResponse.json({ message: "Hello, World!" });
}