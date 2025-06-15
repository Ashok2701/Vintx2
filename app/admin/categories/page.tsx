'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlusCircle, Trash2, Pencil, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  parentId: string | null;
  children?: Category[];
  createdAt: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleAdd = async () => {
    if (!name.trim()) return toast.error("Please enter category name");
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name, parentId }),
      });

      if (!res.ok) {
        const err = await res.json();
        return toast.error(err?.error || "Something went wrong");
      }

      setName("");
      setParentId(null);
      toast.success("Category added");
      fetchCategories();
    } catch {
      toast.error("Error adding category");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        return toast.error(err?.error || "Delete failed");
      }
      toast.success("Deleted successfully");
      fetchCategories();
    } catch {
      toast.error("Error deleting category");
    }
  };

  const handleEdit = async (id: string) => {
    if (!editValue.trim()) return toast.error("Please enter new name");
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name: editValue }),
      });
      if (!res.ok) return toast.error("Failed to update");

      toast.success("Updated successfully");
      setEditingId(null);
      fetchCategories();
    } catch {
      toast.error("Error updating category");
    }
  };

  const renderTree = (nodes: Category[], level = 0) => {
    return nodes.map((cat) => (
      <div key={cat.id} style={{ marginLeft: level * 20 }} className="mb-2">
        <div className="flex items-center gap-2">
          {editingId === cat.id ? (
            <>
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-60"
              />
              <Button size="sm" onClick={() => handleEdit(cat.id)}>
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                <X size={16} />
              </Button>
            </>
          ) : (
            <>
              <span className="font-medium">{cat.name}</span>
              <span className="text-sm text-gray-500">
                ({format(new Date(cat.createdAt), "MMM d, yyyy")})
              </span>
              <Button size="icon" variant="ghost" onClick={() => {
                setEditingId(cat.id);
                setEditValue(cat.name);
              }}>
                <Pencil size={16} />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => handleDelete(cat.id)}>
                <Trash2 size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setParentId(cat.id);
                  setName("");
                }}
              >
                Add Sub
              </Button>
            </>
          )}
        </div>

        {cat.children && renderTree(cat.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">
          {parentId ? "Add Subcategory" : "Add Main Category"}
        </h2>
        <div className="flex items-center gap-2">
          <Input
            placeholder={parentId ? "Subcategory name" : "Main category name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2" size={18} />
            Add
          </Button>
          {parentId && (
            <Button variant="ghost" onClick={() => setParentId(null)}>
              Cancel
            </Button>
          )}
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-3">Category List</h2>
        {categories.length > 0 ? (
          renderTree(categories)
        ) : (
          <p className="text-gray-500">No categories yet.</p>
        )}
      </div>
    </div>
  );
}
