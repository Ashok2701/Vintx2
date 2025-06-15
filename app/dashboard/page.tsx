
"use client";


import ProductForm from "@/components/product/ProductForm";
import ProductCard from "@/components/product/ProductCard";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";






async function getSellerProducts() {
  const res = await fetch("http://localhost:3000/api/my-products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function DashboardPage() {
  const products = await getSellerProducts();

   const { user, isSignedIn } = useUser();
  const router = useRouter();


  console.log("Data at page 1",user)

  useEffect(() => {
    const role = user?.publicMetadata?.role;

    if (isSignedIn && role === "admin") {
      router.replace("/admin");
    }
  }, [isSignedIn, user]);



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
      <ProductForm />
    </div>
  );
}
