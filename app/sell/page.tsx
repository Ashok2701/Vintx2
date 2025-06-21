"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import ProductForm from "@/components/product/ProductForm";

// ✅ Define the user type
interface DbUser {
  id: string;
  clerkId: string;
  email: string;
  name?: string;
  // Add other properties as needed based on your user schema
}




export default function SellPage() {
  const { user, isLoaded, isSignedIn } = useUser();
    const [dbUser, setDbUser] = useState<DbUser | null>(null);

    
 useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      fetch(`/api/get-user-by-clerk-id?clerkId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) setDbUser(data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
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
