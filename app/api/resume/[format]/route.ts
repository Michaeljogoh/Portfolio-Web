import { NextResponse } from "next/server";
import { getResumeFile } from "@/lib/data/resume";
import { isResumeFormat } from "@/lib/resume";

type Params = { params: Promise<{ format: string }> };

const CONTENT_TYPE = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

export async function GET(_request: Request, { params }: Params) {
  const { format } = await params;

  if (!isResumeFormat(format)) {
    return NextResponse.json({ error: "Invalid resume format." }, { status: 400 });
  }

  const file = await getResumeFile(format);
  if (!file) {
    return NextResponse.json({ error: "Resume not found." }, { status: 404 });
  }

  const upstream = await fetch(file.url);
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: "Unable to fetch resume file." },
      { status: 502 },
    );
  }

  const safeName = file.fileName.replace(/["\r\n]/g, "_");

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": CONTENT_TYPE[format],
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
