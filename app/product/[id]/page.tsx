// app/product/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// 1. Generate static params to define id typing clearly:
export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { id: true } });
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();

  await prisma.product.update({
    where: { id: params.id },
    data: { views: { increment: 1 } },
  });

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return notFound();

  async function addToFavorite() {
    "use server";
    if (!userId) return redirect("/sign-in");
    const exists = await prisma.favorite.findFirst({
      where: { userId, productId: product.id },
    });
    if (!exists) {
      await prisma.favorite.create({ data: { userId, productId: product.id } });
    }
    revalidatePath(`/product/${product.id}`);
  }

  async function buyNow() {
    "use server";
    if (!userId) return redirect("/sign-in");
    redirect("/checkout");
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* ...rest of your JSX */}
    </div>
  );
}
