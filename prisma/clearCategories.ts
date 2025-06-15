import { prisma } from "@/lib/prisma";

async function clear() {
  try {
    await prisma.category.deleteMany({});
    console.log("✅ All categories cleared.");
  } catch (err) {
    console.error("❌ Failed to clear categories:", err);
  } finally {
    await prisma.$disconnect();
  }
}

clear();
