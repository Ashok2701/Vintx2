import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { name, description, price, categoryId, images, sellerId } = await req.json();

    // Optional: Server-side auth check (if needed)
    const { userId } = await auth();
  
    console.log("at product seller param", sellerId);
    console.log("at product api", userId);

    if (!userId && !sellerId) {
      return NextResponse.json({ error: "You must be signed in to create a product." }, { status: 401 });
    }

    if (!name || !price || !images?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Use a default category if none provided
    const finalCategoryId = categoryId || await getDefaultCategory();

    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        categoryId: finalCategoryId,
        images,
        sellerId: sellerId || userId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("Product creation failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Product fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// Helper function to get or create a default category
async function getDefaultCategory() {
  try {
    let defaultCategory = await prisma.category.findFirst({
      where: { name: "General" }
    });

    if (!defaultCategory) {
      defaultCategory = await prisma.category.create({
        data: {
          name: "General",
          slug: "general"
        }
      });
    }

    return defaultCategory.id;
  } catch (error) {
    console.error("Error getting default category:", error);
    throw error;
  }
}