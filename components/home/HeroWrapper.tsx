"use client";

import { useUser } from "@clerk/nextjs";
import Hero from "./Hero";

export default function HeroWrapper() {
  const { isSignedIn } = useUser();

  if (isSignedIn) return null;

  return <Hero />;
}
