import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = auth();
  const { productId } = await req.json();

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const exists = await prisma.favorite.findFirst({
    where: { userId, productId },
  });

  if (exists) {
    return NextResponse.json({ message: "Already in wishlist" });
  }

  const favorite = await prisma.favorite.create({
    data: { userId, productId },
  });

  return NextResponse.json(favorite);
}
