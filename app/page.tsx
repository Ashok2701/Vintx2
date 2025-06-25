import { Suspense } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoryGrid } from "@/components/home/category-grid";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      
      <section className="container mx-auto px-4">
        <CategoryGrid />
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          <p className="text-muted-foreground mt-2">
            Discover our handpicked selection of premium products
          </p>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <FeaturedProducts />
        </Suspense>
      </section>

      <NewsletterSection />
    </div>
  );
}