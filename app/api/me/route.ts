// app/api/me/route.ts
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest  } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req); // ✅ THIS IS THE FIX

  console.log("GET /api/me userId:", userId);

  if (!userId) return NextResponse.json({ role: null });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

    console.log("GET /api/me user details are:", user);


  return NextResponse.json({ role: user?.role || "member" });
}
