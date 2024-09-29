import { NextResponse } from "next/server";

export async function POST(request ) : Promise<Response> {
  const { text } = await request.json();
  console.log(text);

  return NextResponse.json({ message: "Hello, World!" });
}