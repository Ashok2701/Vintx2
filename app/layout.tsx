import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { UserSync } from "@/components/auth/user-sync";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarketPlace Pro - Premium E-commerce Platform",
  description: "A modern, scalable e-commerce marketplace built with Next.js 15",
  keywords: ["ecommerce", "marketplace", "shopping", "nextjs", "react"],
  authors: [{ name: "MarketPlace Pro Team" }],
  openGraph: {
    title: "MarketPlace Pro",
    description: "Premium E-commerce Platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <UserSync />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}