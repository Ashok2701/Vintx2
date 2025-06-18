// prisma/seed.ts
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils"; // optional utility for slugs

async function main() {
  // Step 1: Create a parent category
  

  // Step 3: Seed a product into the subcategory
  await prisma.product.create({
    data: {
      name: "Classic White Shirt",
      description: "A crisp white shirt perfect for formal occasions.",
      price: 999.99,
      images: ["https://via.placeholder.com/500"],
      sellerId : "cmbxrkqmp0000epu4qnmuyj96",
      categoryId : "cmbxsfs8f0002epyghyuux7cn"
    },
  });

  console.log("✅ Seeded category hierarchy and product.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
