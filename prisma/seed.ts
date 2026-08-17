import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed default skills
  const skillsData = [
    { name: "Next.js & React", category: "Programming", description: "Frontend web development with React and Next.js framework" },
    { name: "TypeScript & JavaScript", category: "Programming", description: "Typed web programming and Node.js backend logic" },
    { name: "UI/UX & Figma Design", category: "Design", description: "User interface design, wireframing and prototyping" },
    { name: "Calculus & Linear Algebra", category: "Math", description: "Higher level undergraduate mathematics and problem solving" },
    { name: "Academic Writing & Essay Review", category: "Writing", description: "Grammar, structuring, citations, and essay proofreading" },
  ];

  for (const s of skillsData) {
    await prisma.skill.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
  }

  // Seed demo user
  const demoEmail = "demo@university.edu";
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const demoUser = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      email: demoEmail,
      passwordHash,
      role: "USER",
      profile: {
        create: {
          fullName: "Alex Student",
          university: "State University",
          major: "Computer Science",
          bio: "Passionate CS student who loves building web apps and helping peers with code.",
        },
      },
      creditAccount: {
        create: {
          balance: 100,
        },
      },
    },
  });

  console.log("Database seeded successfully. Demo user ID:", demoUser.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
