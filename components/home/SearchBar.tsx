import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="my-6 max-w-xl mx-auto">
      <Input placeholder="Search for products..." className="w-full" />
    </div>
  );
}
