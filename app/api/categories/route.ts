import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🔽 Recursive function to nest categories
const buildTree = (categories: any[], parentId: string | null = null) => {
  return categories
    .filter((cat) => cat.parentId === parentId)
    .map((cat) => ({
      ...cat,
      children: buildTree(categories, cat.id),
    }));
};

// 🔧 Helper: Slugify + Ensure Uniqueness
function slugify(base: string) {
  return base.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
}

async function generateUniqueSlug(name: string): Promise<string> {
  let base = slugify(name);
  let slug = base;
  let count = 1;

  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${base}-${count++}`;
  }

  return slug;
}

// 📌 GET: Fetch categories as nested tree
export async function GET() {
  try {
    const flatCategories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    });

    const nested = buildTree(flatCategories, null);
    return NextResponse.json(nested);
  } catch (err) {
    console.error("❌ Failed to fetch categories:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 📌 POST: Add new category
export async function POST(req: Request) {
  const { name, parentId } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const exists = await prisma.category.findFirst({
      where: { name, parentId: parentId || null },
    });

    if (exists) {
      return NextResponse.json(
        { error: "Category already exists under the same parent" },
        { status: 409 }
      );
    }

    const slug = await generateUniqueSlug(name);

    const created = await prisma.category.create({
      data: {
        name,
        parentId: parentId || null,
        slug,
      },
    });

    return NextResponse.json(created);
  } catch (err) {
    console.error("❌ Failed to create category:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
