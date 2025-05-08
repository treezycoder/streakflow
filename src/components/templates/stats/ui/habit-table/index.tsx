"use client";

import React, { useState, useMemo } from "react";
import { useAppSelector } from "@/redux/hooks/useOutSideClick";
import { SearchBar } from "./search-bar";
import { CategoryFilter } from "./category-filter";
import { HabitTableRow } from "./table-row";

const HabitTable: React.FC = () => {
  const { habits } = useAppSelector((state) => state.app);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesSearch = habit.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? habit.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, habits]);

  return (
    <section className="w-full space-y-6">
      <div className="flex gap-4 w-full items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Volume
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Unit
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Goal
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Current
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Streak
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Completed
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Missed
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Date Added
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredHabits.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-2 text-center text-sm text-gray-600 dark:text-gray-300"
                >
                  No habits found.
                </td>
              </tr>
            ) : (
              filteredHabits.map((habit, i) => (
                <HabitTableRow key={`${i}-${habit}`} habit={habit} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HabitTable;
