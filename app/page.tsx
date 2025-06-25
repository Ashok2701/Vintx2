import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoryGrid } from "@/components/home/category-grid";
import { NewsletterSection } from "@/components/home/newsletter-section";

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
        <FeaturedProducts />
      </section>

      <NewsletterSection />
    </div>
  );
}