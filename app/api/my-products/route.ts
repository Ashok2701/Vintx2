import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
 // const { userId } = auth();

//   if (!userId) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

const userId = 'Test'

  try {
    const products = await prisma.product.findMany({
      where: {
        sellerId: userId,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Fetch seller products error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
