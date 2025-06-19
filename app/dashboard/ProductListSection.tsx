"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import ProductForm from "@/components/product/ProductForm";

type Props = {
  products: any[];
};

export default function ProductListSection({ products }: Props) {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata?.role;
    if (isSignedIn && role === "admin") {
      router.replace("/admin");
    }
  }, [isSignedIn, user, router]);

  const sellerId = user?.id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.length > 0 ? (
          products.map((p: any) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <hr className="my-10" />
      <h2 className="text-xl font-semibold mb-2">Add New Product</h2>

      {sellerId ? (
        <ProductForm sellerId={sellerId} />
      ) : (
        <p className="text-gray-500">Loading user info...</p>
      )}
    </div>
  );
}
