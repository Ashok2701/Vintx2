// app/product/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";

interface Props {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: Props) {
  const { userId } = auth();

  console.log("🧪 SERVER userId:", userId);


  // Increment view count
  await prisma.product.update({
    where: { id: params.id },
    data: { views: { increment: 1 } },
  });

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  async function addToFavorite() {
    "use server";
    if (!userId) return redirect("/sign-in");

    const exists = await prisma.favorite.findFirst({
      where: {
        userId,
        productId: product.id,
      },
    });

    if (!exists) {
      await prisma.favorite.create({
        data: {
          userId,
          productId: product.id,
        },
      });
    }

    revalidatePath(`/product/${product.id}`);
  }

  async function buyNow() {
    "use server";
    if (!userId) return redirect("/sign-in");

    // You can implement checkout flow here
    console.log("User wants to buy:", product.name);
    redirect("/checkout");
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Images */}
        <div className="space-y-4">
          {product.images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Product image ${i + 1}`}
              width={500}
              height={500}
              className="rounded"
            />
          ))}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold">₹{product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Views: {product.views}</p>

          <form action={buyNow}>
            <button
              type="submit"
              disabled={!userId}
              className="bg-teal-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Buy Now
            </button>
          </form>

          <form action={addToFavorite}>
            <button
              type="submit"
              disabled={!userId}
              className="border px-4 py-2 rounded disabled:opacity-50"
            >
              Add to Wishlist
            </button>
          </form>

         
        </div>
      </div>
    </div>
  );
}
