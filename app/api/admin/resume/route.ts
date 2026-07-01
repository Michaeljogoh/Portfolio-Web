import { NextResponse } from "next/server";
import { getResumeFiles } from "@/lib/data/resume";

export async function GET() {
  const files = await getResumeFiles();
  return NextResponse.json(files);
}
