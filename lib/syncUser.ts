import { prisma } from '@/lib/prisma';

export async function syncUser(clerkId: string, email?: string, name?: string) {
  try {
    const existing = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!existing) {
      await prisma.user.create({
        data: {
          clerkId,
          email: email || 'user@example.com', // Provide a default email if none provided
          name: name || 'User', // Provide a default name if none provided
          role: "member",
        },
      });
      console.log("✅ User added to DB");
    } else {
      console.log("ℹ️ User already in DB");
    }
  } catch (err) {
    console.error("❌ Error syncing user:", err);
  }
}