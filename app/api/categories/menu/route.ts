// app/api/categories/menu/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: {
        include: {
          children: true, // Optional: deeper levels
        }
      }
    },
    orderBy: { name: "asc" }
  });

  return NextResponse.json(categories);
}
