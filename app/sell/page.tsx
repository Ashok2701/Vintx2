"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import ProductForm from "@/components/product/ProductForm";

export default function SellPage() {
  const { user, isLoaded, isSignedIn } = useUser();
    const [dbUser, setDbUser] = useState(null);

    
 useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetch(`/api/get-user-by-clerk-id?clerkId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) setDbUser(data);
        });
    }
  }, [isLoaded, isSignedIn, user?.id]);



  if (!isLoaded) return <p>Loading...</p>;

  if (!isSignedIn || !user?.id) {
    return <p>You must be signed in to create a product.</p>;
  }

  console.log("User details at Sell page", user);

console.log("User details at dbuser ", dbUser);
  
  if (!dbUser) return <p>Loading user info...</p>;


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sell Your Product</h1>
      <ProductForm sellerId={dbUser?.id} />
    </div>
  );
}
