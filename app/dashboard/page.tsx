import ProductListSection from "./ProductListSection";
import { getBaseUrl } from "@/lib/getBaseUrl";

async function getSellerProducts() {
  
  
  const res = await fetch(`${getBaseUrl()}/api/products`, { cache: "no-store" });

  return res.json();
}

export default async function DashboardPage() {
  const products = await getSellerProducts();

  return <ProductListSection products={products} />;
}
