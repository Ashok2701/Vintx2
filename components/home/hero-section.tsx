"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                New arrivals every week
              </div>
              <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
                Discover Premium
                <span className="text-primary"> Products</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Shop from thousands of verified sellers and discover unique products
                that match your style and needs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sell">Start Selling</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div>
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div>Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">5K+</div>
                <div>Sellers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div>Happy Customers</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
              <div className="h-full w-full rounded-xl bg-background/50 backdrop-blur-sm border flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Premium Quality</h3>
                  <p className="text-muted-foreground">
                    Curated products from trusted sellers
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}