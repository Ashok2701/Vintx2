export async function syncUser(clerkId: string) {
  try {
    const existing = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!existing) {
      await prisma.user.create({
        data: {
          clerkId,
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
