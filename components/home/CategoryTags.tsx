import { Badge } from "@/components/ui/badge";

const categories = ["Clothing", "Electronics", "Home", "Books", "Toys", "Shoes"];

export default function CategoryTags() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((cat) => (
        <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-gray-200">
          {cat}
        </Badge>
      ))}
    </div>
  );
}
