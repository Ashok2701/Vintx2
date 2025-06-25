"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function UserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isLoaded && user) {
      const syncUser = async () => {
        try {
          await fetch("/api/sync-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress || "",
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