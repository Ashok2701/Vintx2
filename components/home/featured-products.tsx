import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ui/product-card";

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        featured: true,
      },
      include: {
        category: true,
        seller: {
          select: {
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            reviews: true,
            favorites: true,
          },
        },
      },
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No featured products available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}