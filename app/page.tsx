import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import ProductCard from "@/components/product/ProductCard";
import HomeContent2 from "@/components/home/HomePage";
import { getBaseUrl } from "@/lib/getBaseUrl";


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category?: { name: string };
  createdAt: string;
}

export default async function HomePage() {
  const { userId } = await auth();


const res = await fetch(`${getBaseUrl()}/api/products`, { cache: "no-store" });



  if (!res.ok) {
  const text = await res.text();
  console.error("API Error:", text);
  throw new Error("Failed to load products");
}

  const products: Product[] = await res.json();

  console.log("user details are ", userId)
  console.log("Prpducts data  =", products)


if (products.length === 0) {
  return <p className="text-center text-gray-500 mt-10">No products available yet.</p>;
}



  return (
    <div className="w-full">
      {/* ✅ Full-width banner */}
      <HomeContent2 />
      {/* ✅ Section Title */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">
          {userId ? "Latest Products" : "Featured Products"}
        </h2>

        {/* ✅ Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
