import { getPrisma } from "@/lib/prisma";

type ReorderModelName = "project" | "experience" | "certification";

async function getExistingIds(model: ReorderModelName): Promise<string[]> {
  const prisma = getPrisma();

  switch (model) {
    case "project":
      return (await prisma.project.findMany({ select: { id: true } })).map(
        (row) => row.id,
      );
    case "experience":
      return (await prisma.experience.findMany({ select: { id: true } })).map(
        (row) => row.id,
      );
    case "certification":
      return (
        await prisma.certification.findMany({ select: { id: true } })
      ).map((row) => row.id);
  }
}

export async function reorderItems(
  model: ReorderModelName,
  orderedIds: string[],
): Promise<void> {
  const existingIds = new Set(await getExistingIds(model));

  if (orderedIds.length !== existingIds.size) {
    throw new Error("Ordered IDs must include every item exactly once.");
  }

  const seen = new Set<string>();
  for (const id of orderedIds) {
    if (!existingIds.has(id)) {
      throw new Error("Ordered IDs contain an unknown item.");
    }
    if (seen.has(id)) {
      throw new Error("Ordered IDs must not contain duplicates.");
    }
    seen.add(id);
  }

  const prisma = getPrisma();

  switch (model) {
    case "project":
      await prisma.$transaction(
        orderedIds.map((id, index) =>
          prisma.project.update({
            where: { id },
            data: { sortOrder: index },
          }),
        ),
      );
      break;
    case "experience":
      await prisma.$transaction(
        orderedIds.map((id, index) =>
          prisma.experience.update({
            where: { id },
            data: { sortOrder: index },
          }),
        ),
      );
      break;
    case "certification":
      await prisma.$transaction(
        orderedIds.map((id, index) =>
          prisma.certification.update({
            where: { id },
            data: { sortOrder: index },
          }),
        ),
      );
      break;
  }
}
