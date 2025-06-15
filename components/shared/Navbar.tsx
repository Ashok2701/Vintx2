"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, BellIcon, MailIcon, HeartIcon } from "lucide-react";


export default function Navbar() {
  const [selectedLabel, setSelectedLabel] = useState("Catalog");
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search for items");


  const [role, setRole] = useState("member");

  const pathname = usePathname();


  useEffect(() => {
    async function fetchRole() {
      const res = await fetch("/api/me");
      const data = await res.json();
      setRole(data.role);
    }

    if (user) fetchRole();
  }, [user]);

  const isAdmin = role === "admin";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b px-4 py-3 md:px-10 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-teal-700">
        VintX
      </Link>

      {/* Catalog + Search */}
      <div className="flex-1/3 mx-6 flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-r-none bg-gray-100 text-gray-700 border-r-0"
            >
              {selectedLabel}
              <ChevronDown size={16} className="ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Catalog", "Members", "Help Center"].map((item) => (
              <DropdownMenuItem
                key={item}
                onSelect={() => {
                  setSelectedLabel(item);
                  if (item === "Catalog") {
                    setSearchPlaceholder("Search for items");
                  } else if (item === "Members") {
                    setSearchPlaceholder("Search for members");
                  } else if (item === "Help Center") {
                    setSearchPlaceholder("Search help topics");
                  }
                }}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          placeholder={searchPlaceholder}
          className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] bg-gray-100 rounded-l-none border-l-0"
        />
      </div>

      {/* Auth + Dashboard Toggle + Sell */}
      <div className="flex-1 flex items-center gap-3">
        <SignedOut>
          <SignInButton mode="modal">
            <Button
              variant="outline"
              className="border-teal-700 text-teal-700 hover:bg-teal-50"
            >
              Sign up | Log in
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-6 text-gray-600">
            <Link href="/messages">
              <MailIcon size={20} className="hover:text-teal-700" />
            </Link>
            <Link href="/notifications">
              <BellIcon size={20} className="hover:text-teal-700" />
            </Link>
            <Link href="/wishlist">
              <HeartIcon size={20} className="hover:text-teal-700" />
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>

        {isAdmin && (
  <Link href={pathname.startsWith("/admin") ? "/" : "/admin"}>
    <Button variant="outline" className="border-teal-700 text-teal-700 hover:bg-teal-50">
      {pathname.startsWith("/admin") ? "Shop" : "Admin Dashboard"}
    </Button>
  </Link>
)}

        </SignedIn>

        <Button className="bg-teal-700 hover:bg-teal-800 text-white">
          <Link href="/sell">Sell now</Link>
        
        </Button>
      </div>
    </nav>
  );
}
