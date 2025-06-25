"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  parentId: string | null;
  children?: Category[];
}

export default function ProductForm({ sellerId }: { sellerId: string }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const findCategoryByPath = (path: string[]): Category[][] => {
    let currentLevel = categories;
    const levels: Category[][] = [currentLevel];

    for (const id of path) {
      const found = currentLevel.find((c) => c.id === id);
      if (found && found.children && found.children.length > 0) {
        currentLevel = found.children;
        levels.push(currentLevel);
      } else {
        break;
      }
    }

    return levels;
  };

  const handleCategoryChange = (level: number, id: string) => {
    const newPath = [...selectedPath.slice(0, level), id];
    setSelectedPath(newPath);
    setForm((prev) => ({ ...prev, categoryId: id }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!form.name || !form.price) {
        toast.error("Please fill in name and price");
        return;
      }

      if (uploadedImages.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          sellerId,
          images: uploadedImages,
        }),
      });

      if (res.ok) {
        toast.success("Product created successfully!");
        // Reset form
        setForm({
          name: "",
          description: "",
          price: "",
          categoryId: "",
        });
        setSelectedPath([]);
        setUploadedImages([]);
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to create product");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCategoryDropdowns = () => {
    const levels = findCategoryByPath(selectedPath);

    return levels.map((categoriesAtLevel, index) => (
      <select
        key={`cat-level-${index}`}
        value={selectedPath[index] || ""}
        onChange={(e) => handleCategoryChange(index, e.target.value)}
        className="border rounded p-2 mb-2 w-full"
      >
        <option value="">Select category</option>
        {categoriesAtLevel.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">Sell Your Product</h2>

      <Input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <Textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Input
        type="number"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        {renderCategoryDropdowns()}
      </div>

      {/* Upload Images */}
      <div>
        <label className="block text-sm font-medium mb-2">Images</label>
        <UploadButton
          endpoint="productImage"
          onClientUploadComplete={(res) => {
            const urls = res.map((f) => f.url || f.ufsUrl);
            setUploadedImages((prev) => [...prev, ...urls]);
            toast.success("Images uploaded!");
          }}
          onUploadError={(error) => {
            console.error("Upload error:", error);
            toast.error("Upload failed");
          }}
          className="ut-upload-dropzone w-full ut-button:bg-teal-600"
        />
      </div>

      {uploadedImages.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {uploadedImages.map((src, idx) => (
            <div key={idx} className="relative">
              <Image
                src={src}
                alt={`Image ${idx}`}
                width={100}
                height={100}
                className="rounded border"
              />
              <button
                type="button"
                onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <Button 
        type="submit" 
        className="bg-teal-700 text-white w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create Product"}
      </Button>
    </form>
  );
}