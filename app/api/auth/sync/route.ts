import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { clerkId, email, name, avatar } = await req.json();

    if (!clerkId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        email,
        name,
        avatar,
      },
      create: {
        clerkId,
        email,
        name,
        avatar,
        role: "USER",
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("User sync error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}