import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { skillCategorySchema } from "@/lib/validations/admin";
import { revalidatePublicSection } from "@/lib/revalidate";

export async function GET() {
  const categories = await getPrisma().skillCategory.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: {
      skills: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
    },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = skillCategorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const maxOrder = await getPrisma().skillCategory.aggregate({
    _max: { sortOrder: true },
  });
  const category = await getPrisma().skillCategory.create({
    data: {
      name: data.name,
      sortOrder: data.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });
  revalidatePublicSection("skills");
  return NextResponse.json(category, { status: 201 });
}
