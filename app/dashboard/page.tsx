import ProductListSection from "./ProductListSection";

async function getSellerProducts() {
  const res = await fetch("/api/my-products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function DashboardPage() {
  const products = await getSellerProducts();

  return <ProductListSection products={products} />;
}
