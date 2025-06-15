'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAdminRole() {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();

        if (data.role !== "admin") {
          router.replace("/?error=unauthorized");
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error verifying admin role:", err);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    }

    checkAdminRole();
  }, [router]);

  if (loading) return null;

  if (!isAdmin) return null;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminCard title="Users" description="Manage platform users" link="/admin/users" />
        <AdminCard title="Products" description="Manage listings and items" link="/admin/products" />
        <AdminCard title="Orders" description="View and track orders" link="/admin/orders" />
        <AdminCard title="Sales" description="Sales performance & metrics" link="/admin/sales" />
        <AdminCard title="Transport" description="Shipping and logistics" link="/admin/transport" />
        <AdminCard title="Settings" description="Platform configuration" link="/admin/settings" />
         <AdminCard title="Categories" description="Categories" link="/admin/categories" />
      </div>
    </main>
  );
}

function AdminCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <a
      href={link}
      className="p-4 border rounded-lg shadow-sm hover:shadow-md hover:border-teal-700 transition"
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500 mt-1 text-sm">{description}</p>
    </a>
  );
}
