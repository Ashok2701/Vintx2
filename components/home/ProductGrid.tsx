import ProductCard from "@/components/product/ProductCard";

async function getProducts() {
  const res = await fetch("/api/products",  {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
