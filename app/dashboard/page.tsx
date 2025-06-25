import ProductListSection from "./ProductListSection";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

async function getSellerProducts() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/my-products`, { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const products = await getSellerProducts();

  return <ProductListSection products={products} />;
}