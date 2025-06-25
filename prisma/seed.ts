import { PrismaClient } from "@prisma/client";
import { slugify } from "../lib/utils";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  const categories = [
    {
      name: "Electronics",
      description: "Latest gadgets and electronic devices",
      children: [
        { name: "Smartphones", description: "Mobile phones and accessories" },
        { name: "Laptops", description: "Computers and laptops" },
        { name: "Audio", description: "Headphones, speakers, and audio equipment" },
      ],
    },
    {
      name: "Fashion",
      description: "Clothing and fashion accessories",
      children: [
        { name: "Men's Clothing", description: "Clothing for men" },
        { name: "Women's Clothing", description: "Clothing for women" },
        { name: "Shoes", description: "Footwear for all occasions" },
      ],
    },
    {
      name: "Home & Garden",
      description: "Home improvement and garden supplies",
      children: [
        { name: "Furniture", description: "Home and office furniture" },
        { name: "Kitchen", description: "Kitchen appliances and tools" },
        { name: "Garden", description: "Garden tools and plants" },
      ],
    },
  ];

  for (const category of categories) {
    const parentCategory = await prisma.category.create({
      data: {
        name: category.name,
        slug: slugify(category.name),
        description: category.description,
      },
    });

    for (const child of category.children) {
      await prisma.category.create({
        data: {
          name: child.name,
          slug: slugify(child.name),
          description: child.description,
          parentId: parentCategory.id,
        },
      });
    }
  }

  const sampleProducts = [
    {
      name: "iPhone 15 Pro",
      description: "Latest iPhone with advanced camera system and A17 Pro chip",
      price: 999.99,
      comparePrice: 1099.99,
      images: [
        "https://picsum.photos/400/400?random=1",
        "https://picsum.photos/400/400?random=2",
      ],
      categoryName: "Smartphones",
      inventory: 50,
      featured: true,
      tags: ["apple", "smartphone", "5g", "camera"],
    },
    {
      name: "MacBook Pro 16\"",
      description: "Powerful laptop for professionals with M3 Pro chip",
      price: 2499.99,
      comparePrice: 2699.99,
      images: [
        "https://picsum.photos/400/400?random=3",
        "https://picsum.photos/400/400?random=4",
      ],
      categoryName: "Laptops",
      inventory: 25,
      featured: true,
      tags: ["apple", "laptop", "professional", "m3"],
    },
    {
      name: "Sony WH-1000XM5",
      description: "Industry-leading noise canceling wireless headphones",
      price: 399.99,
      comparePrice: 449.99,
      images: [
        "https://picsum.photos/400/400?random=5",
        "https://picsum.photos/400/400?random=6",
      ],
      categoryName: "Audio",
      inventory: 75,
      featured: true,
      tags: ["sony", "headphones", "wireless", "noise-canceling"],
    },
    {
      name: "Classic White Shirt",
      description: "Premium cotton dress shirt perfect for any occasion",
      price: 89.99,
      comparePrice: 119.99,
      images: [
        "https://picsum.photos/400/400?random=7",
        "https://picsum.photos/400/400?random=8",
      ],
      categoryName: "Men's Clothing",
      inventory: 100,
      featured: false,
      tags: ["shirt", "cotton", "formal", "classic"],
    },
    {
      name: "Modern Office Chair",
      description: "Ergonomic office chair with lumbar support",
      price: 299.99,
      comparePrice: 399.99,
      images: [
        "https://picsum.photos/400/400?random=9",
        "https://picsum.photos/400/400?random=10",
      ],
      categoryName: "Furniture",
      inventory: 30,
      featured: true,
      tags: ["chair", "office", "ergonomic", "furniture"],
    },
  ];

  const demoUser = await prisma.user.create({
    data: {
      clerkId: "demo_user_123",
      email: "demo@example.com",
      name: "Demo Seller",
      role: "SELLER",
      verified: true,
    },
  });

  for (const productData of sampleProducts) {
    const category = await prisma.category.findFirst({
      where: { name: productData.categoryName },
    });

    if (category) {
      await prisma.product.create({
        data: {
          name: productData.name,
          slug: slugify(productData.name),
          description: productData.description,
          price: productData.price,
          comparePrice: productData.comparePrice,
          images: productData.images,
          inventory: productData.inventory,
          featured: productData.featured,
          tags: productData.tags,
          status: "ACTIVE",
          sellerId: demoUser.id,
          categoryId: category.id,
        },
      });
    }
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });