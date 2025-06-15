"use client";

import { useEffect, useState } from "react";

export default function AdminStats() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    sales: 0,
    shipments: 0,
  });

  useEffect(() => {
    fetch("/api/admin-stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  const Card = ({ label, value }: { label: string; value: any }) => (
    <div className="border p-4 rounded shadow bg-white text-center">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      <Card label="Users" value={stats.users} />
      <Card label="Orders" value={stats.orders} />
      <Card label="Products" value={stats.products} />
      <Card label="Sales ($)" value={stats.sales.toFixed(2)} />
      <Card label="Shipments" value={stats.shipments} />
    </div>
  );
}
