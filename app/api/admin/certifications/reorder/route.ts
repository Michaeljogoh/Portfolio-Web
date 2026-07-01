import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { reorderItems } from "@/lib/reorder";
import { reorderSchema } from "@/lib/validations/admin";
import { jsonError } from "@/lib/api-auth";

export async function PATCH(request: Request) {
  const body = await request.json();
  const parsed = reorderSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Invalid reorder payload.", 400);
  }

  try {
    const prisma = getPrisma();
    await reorderItems("certification", parsed.data.orderedIds);
    const items = await prisma.certification.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json(items);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Reorder failed.";
    return jsonError(message, 400);
  }
}
