"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import ProductForm from "@/components/product/ProductForm";

// Define the type for the database user
interface DbUser {
  id: string;
  clerkId: string;
  email: string;
  name?: string;
}

export default function SellPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      fetch(`/api/get-user-by-clerk-id?clerkId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setDbUser(data);
          } else {
            console.error("User not found in database:", data.error);
          }
        })
        .catch(error => {
          console.error("Error fetching user:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user?.id]);

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isSignedIn || !user?.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg mb-4">You must be signed in to create a product.</p>
          <a href="/sign-in" className="text-teal-600 hover:underline">
            Sign in here
          </a>
        </div>
      </div>
    );
  }

  if (!dbUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg mb-4">Setting up your account...</p>
          <p className="text-sm text-gray-500">This may take a moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sell Your Product</h1>
      <ProductForm sellerId={dbUser.id} />
    </div>
  );
}