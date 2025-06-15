"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function UserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isLoaded && user) {
      fetch("/api/sync-user", {
        method: "POST",
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
        }),
      });
    }
  }, [isLoaded, user]);

  return null;
}
