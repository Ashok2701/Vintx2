import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/shared/Navbar";
import CategoryMenu from "@/components/shared/CategoryMenu";
import { Toaster } from 'sonner';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vintx - Curate your closet.Sustain your style ",
  description: "Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
  <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <CategoryMenu />
        {children}
                <Toaster position="top-right" richColors />

      </body>
    </html>
    </ClerkProvider>
  
  );
}
