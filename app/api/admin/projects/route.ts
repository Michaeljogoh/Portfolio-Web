import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations/admin";
import { revalidatePublicSection } from "@/lib/revalidate";

export async function GET() {
  const projects = await getPrisma().project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const maxOrder = await getPrisma().project.aggregate({ _max: { sortOrder: true } });
  const project = await getPrisma().project.create({
    data: {
      ...data,
      sortOrder: data.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });
  revalidatePublicSection("projects");
  return NextResponse.json(project, { status: 201 });
}
