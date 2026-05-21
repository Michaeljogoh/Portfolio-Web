import "dotenv/config";
import bcrypt from "bcryptjs";
import {
  certifications,
  experience,
  projects,
  skills,
} from "../lib/seed-data";
import { getPrisma } from "../lib/prisma";
import { resolveSkillIconUrl } from "../lib/skill-icon-resolver";

const prisma = getPrisma();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@localhost";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMeNow123!";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: projects.map((p, i) => ({
        title: p.title,
        description: p.description,
        tags: [...p.tags],
        categories: [...p.categories],
        image: p.image,
        link: p.link,
        repo: p.repo,
        sortOrder: i,
      })),
    });
  }

  const experienceCount = await prisma.experience.count();
  if (experienceCount === 0) {
    await prisma.experience.createMany({
      data: experience.map((e, i) => ({
        title: e.title,
        date: e.date,
        readTime: e.readTime,
        excerpt: e.excerpt,
        logo: e.logo ?? null,
        sortOrder: i,
      })),
    });
  }

  const certCount = await prisma.certification.count();
  if (certCount === 0) {
    await prisma.certification.createMany({
      data: certifications.map((c, i) => ({
        title: c.title,
        issuer: c.issuer,
        issued: c.issued,
        excerpt: c.excerpt,
        tags: [...c.tags],
        categories: [...c.categories],
        image: c.image,
        credentialUrl: c.credentialUrl,
        sortOrder: i,
      })),
    });
  }

  const skillCategoryCount = await prisma.skillCategory.count();
  if (skillCategoryCount === 0) {
    for (const [catIndex, group] of skills.entries()) {
      const category = await prisma.skillCategory.create({
        data: { name: group.category, sortOrder: catIndex },
      });
      for (const [skillIndex, skillName] of group.items.entries()) {
        const iconUrl = await resolveSkillIconUrl(skillName);
        await prisma.skill.create({
          data: {
            name: skillName,
            iconUrl,
            categoryId: category.id,
            sortOrder: skillIndex,
          },
        });
      }
    }
  }

  console.log(`Seed complete. Admin: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
