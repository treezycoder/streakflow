import { categoryList } from "@/lib/data/defaults";
import React from "react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex justify-between items-center">
      <select
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 rounded-md border border-gray-300 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Categories</option>
        {categoryList.map((category, i) => (
          <option
            key={`${i}-${category}`}
            className="Capitalize"
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
