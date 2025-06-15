// Example: app/admin/products/page.tsx
"use client";

import ProductForm from "@/components/product/ProductForm";
import { useUser } from "@clerk/nextjs";

export default function AdminProductsPage() {
  const { user } = useUser();
  const sellerId = user?.id || "";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <ProductForm sellerId={sellerId} />
    </div>
  );
}
