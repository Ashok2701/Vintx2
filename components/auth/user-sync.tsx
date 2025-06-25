"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function UserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const syncUser = async () => {
        try {
          await fetch("/api/auth/sync", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              name: user.fullName,
              avatar: user.imageUrl,
            }),
          });
        } catch (error) {
          console.error("Failed to sync user:", error);
        }
      };

      syncUser();
    }
  }, [isLoaded, user]);

  return null;
}