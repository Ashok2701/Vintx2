
import HeroWrapper from "@/components/home/HeroWrapper";
import CategoryTags from "@/components/home/CategoryTags";
import SearchBar from "@/components/home/SearchBar";
import ProductGrid from "@/components/home/ProductGrid";

export default function HomeContent() {
 
  return (
    <main className="min-h-screen px-4 md:px-8 lg:px-20 space-y-12">
      <HeroWrapper />
      <SearchBar />
      <CategoryTags />
      <ProductGrid />
    </main>
  );
}
