
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  slug: string;
  gender?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  async function handleAddCategory(parentId?: string) {
    if (!newCategoryName.trim()) {
      toast.error("Category name required");
      return;
    }
    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name: newCategoryName, parentId }),
    });
    if (res.ok) {
      toast.success("Category added");
      setNewCategoryName("");
      fetchCategories();
    } else {
      toast.error("Failed to add category");
    }
  }

  async function handleDeleteCategory(id: string) {
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Category deleted");
      setSelectedCategory(null);
      fetchCategories();
    } else {
      toast.error("Delete failed");
    }
  }

  function renderTree(nodes: Category[]) {
    return (
      <ul className="ml-4 space-y-1">
        {nodes.map((node) => (
          <li key={node.id}>
            <div
              className="cursor-pointer hover:underline"
              onClick={() => setSelectedCategory(node)}
            >
              {node.name}
            </div>
            {node.children && node.children.length > 0 && renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex gap-8 p-6">
      <div className="w-1/2 space-y-4">
        <Input
          placeholder="Enter name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button onClick={() => handleAddCategory()}>Add Category</Button>

        <h2 className="text-xl font-semibold mt-6">Category</h2>
        <div>{renderTree(categories)}</div>
      </div>

      {selectedCategory && (
        <Card className="w-1/2 p-6 space-y-4">
          <h2 className="text-2xl font-bold">{selectedCategory.name}</h2>
          {selectedCategory.gender && (
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {selectedCategory.gender}
            </span>
          )}
          <div>Slug: {selectedCategory.slug}</div>
          <div>Created at: {format(new Date(selectedCategory.createdAt), "PPpp")}</div>
          <div>Updated at: {format(new Date(selectedCategory.updatedAt), "PPpp")}</div>

          <div className="flex gap-4 pt-4">
            <Button onClick={() => handleAddCategory(selectedCategory.id)}>+ Subcategory</Button>
            <Button variant="outline">Edit</Button>
            <Button variant="destructive" onClick={() => handleDeleteCategory(selectedCategory.id)}>
              Delete
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
