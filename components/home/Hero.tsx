import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/banner.jpg" // 🖼️ Make sure this file exists in public/images/
        alt="Closet Banner"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-30">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
          Ready to declutter your closet?
        </h2>

        <Link href="/sell">
          <button className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800 transition">
            Sell now
          </button>
        </Link>

        <Link href="/learn" className="text-sm text-white mt-3 underline hover:text-gray-200">
          Learn how it works
        </Link>
      </div>
    </div>
  );
}
