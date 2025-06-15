// /app/api/get-user-by-clerk-id/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust import to your setup

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("clerkId");

  if (!clerkId) {
    return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
