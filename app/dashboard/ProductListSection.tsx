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
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const role = user?.publicMetadata?.role;
      if (role === "admin") {
        router.replace("/admin");
      }
    }
  }, [isSignedIn, user, router, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg mb-4">Please sign in to view your dashboard.</p>
          <a href="/sign-in" className="text-teal-600 hover:underline">
            Sign in here
          </a>
        </div>
      </div>
    );
  }

  const sellerId = user?.id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.length > 0 ? (
          products.map((p: any) => <ProductCard key={p.id} product={p} />)
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 mb-4">No products found.</p>
            <p className="text-sm text-gray-400">Create your first product below!</p>
          </div>
        )}
      </div>

      <hr className="my-10" />
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

      {sellerId ? (
        <ProductForm sellerId={sellerId} />
      ) : (
        <p className="text-gray-500">Loading user info...</p>
      )}
    </div>
  );
}