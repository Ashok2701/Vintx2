import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const [users, orders, products] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.product.count(),
  ]);

  const sales = await prisma.order.aggregate({
    _sum: { price: true },
  });

  // In future, count only "in transit" orders for shipments
  const shipments = await prisma.order.count({
    where: { status: "SHIPPED" },
  });

  return NextResponse.json({
    users,
    orders,
    products,
    sales: sales._sum.price || 0,
    shipments,
  });
}
