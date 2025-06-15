import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { clerkId: "user_2xbzI9ffuvEpP68G7wwtdoXA9at" }, // Replace this!
    update: { role: "admin" },
    create: {
      clerkId: "user_2xbzI9ffuvEpP68G7wwtdoXA9at",
      role: "admin",
      email : "admin@admin.com"
    },
  });

  console.log("✅ Admin user seeded");
}

main()
  .catch((e) => {
    console.error("❌ Error in seed:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
