import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { certificationSchema } from "@/lib/validations/admin";
import { revalidatePublicSection } from "@/lib/revalidate";

export async function GET() {
  const items = await getPrisma().certification.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = certificationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const maxOrder = await getPrisma().certification.aggregate({
    _max: { sortOrder: true },
  });
  const item = await getPrisma().certification.create({
    data: {
      ...data,
      sortOrder: data.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });
  revalidatePublicSection("certifications");
  return NextResponse.json(item, { status: 201 });
}
