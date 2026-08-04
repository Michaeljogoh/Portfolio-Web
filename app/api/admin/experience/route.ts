import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { experienceSchema } from "@/lib/validations/admin";
import { revalidatePublicSection } from "@/lib/revalidate";

export async function GET() {
  const items = await getPrisma().experience.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = experienceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const maxOrder = await getPrisma().experience.aggregate({
    _max: { sortOrder: true },
  });
  const item = await getPrisma().experience.create({
    data: {
      title: data.title,
      date: data.date,
      readTime: data.readTime,
      excerpt: data.excerpt,
      logo: data.logo ?? null,
      sortOrder: data.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });
  revalidatePublicSection("experience");
  return NextResponse.json(item, { status: 201 });
}
