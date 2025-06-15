"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[];
}

export default function CategoryMenu() {
  const [menu, setMenu] = useState<Category[]>([]);
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/categories/menu");
      const data = await res.json();
      setMenu(data);
    };
    load();
  }, []);

  return (
    <nav className="bg-emerald-900 text-white text-sm font-medium shadow relative">
      <div className="max-w-7xl mx-auto px-4 flex gap-8 h-12 items-center">
        {menu.map(main => (
          <div key={main.id} className="relative group">
            <Link
              href={`/category/${main.slug}`}
              className="flex items-center gap-1 hover:text-teal-300 transition-colors duration-200 py-3"
            >
              {main.name}
              {main.children?.length > 0 && (
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              )}
            </Link>

            {main.children?.length > 0 && (
              <div className="absolute left-0 top-full bg-white text-gray-800 shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-[800px] min-h-[400px]">
                <div className="flex">
                  {/* Left Panel - Subcategories */}
                  <div className="w-64 bg-gray-50 border-r border-gray-200">
                    <div className="p-4">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Categories
                      </h3>
                      <div className="space-y-1">
                        <Link
                          href={`/category/${main.slug}`}
                          className="flex items-center gap-2 py-2 px-3 text-gray-700 hover:bg-white hover:text-emerald-700 rounded-md transition-all duration-200 text-sm font-medium"
                        >
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          All
                        </Link>
                        {main.children.map(subCategory => (
                          <div
                            key={subCategory.id}
                            onMouseEnter={() => setHoveredSubCategory(subCategory.id)}
                            className="relative"
                          >
                            <Link
                              href={`/category/${subCategory.slug}`}
                              className={`flex items-center gap-2 py-2 px-3 text-gray-700 hover:bg-white hover:text-emerald-700 rounded-md transition-all duration-200 text-sm ${
                                hoveredSubCategory === subCategory.id ? 'bg-white text-emerald-700' : ''
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full ${
                                hoveredSubCategory === subCategory.id ? 'bg-emerald-500' : 'bg-gray-400'
                              }`}></div>
                              {subCategory.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Sub-subcategories */}
                  <div className="flex-1 p-6">
                    {hoveredSubCategory ? (
                      <div>
                        {(() => {
                          const selectedSubCategory = main.children.find(sub => sub.id === hoveredSubCategory);
                          return (
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                {selectedSubCategory?.name}
                              </h3>
                              {selectedSubCategory?.children?.length > 0 ? (
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                  {selectedSubCategory.children.map(subSubCategory => (
                                    <Link
                                      key={subSubCategory.id}
                                      href={`/category/${subSubCategory.slug}`}
                                      className="block py-2 text-gray-600 hover:text-emerald-700 transition-colors duration-200 text-sm"
                                    >
                                      {subSubCategory.name}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">No subcategories available</p>
                              )}
                              
                              <div className="mt-6 pt-4 border-t border-gray-200">
                                <Link
                                  href={`/category/${selectedSubCategory?.slug}`}
                                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-200"
                                >
                                  View all {selectedSubCategory?.name} →
                                </Link>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {main.name}
                          </h3>
                          <p className="text-gray-500 text-sm mb-4">
                            Hover over a category to see subcategories
                          </p>
                          <Link
                            href={`/category/${main.slug}`}
                            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-200"
                          >
                            Browse all {main.name} →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}