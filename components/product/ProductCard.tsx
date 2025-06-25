import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category?: {
    name: string;
  };
}

export default function ProductCard({ product }: { product: Product }) {
  const firstImage = product.images?.[0];

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            {firstImage ? (
              <Image
                src={firstImage}
                alt={product.name}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          {product.category && (
            <p className="text-sm text-gray-500 mt-1">{product.category.name}</p>
          )}
        </CardContent>

        <CardFooter className="px-4 pb-4">
          <span className="text-teal-700 font-medium">₹{product.price}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}