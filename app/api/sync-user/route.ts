import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { clerkId, email } = await req.json();

    if (!clerkId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { clerkId } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          role: "member", // default
        },
      });
      console.log("✅ User created in DB:", clerkId);
    } else {
      console.log("ℹ️ User already exists in DB:", clerkId);
    }

    // ✅ Sync role to Clerk public metadata
    try {
      await clerkClient.users.updateUserMetadata(clerkId, {
        publicMetadata: {
          role: user.role,
        },
      });
    } catch (clerkError) {
      console.warn("⚠️ Failed to update Clerk metadata:", clerkError);
      // Don't fail the entire request if Clerk metadata update fails
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("❌ Sync failed:", err);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}