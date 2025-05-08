import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="flex justify-between items-center">
      <input
        type="text"
        placeholder="Search habits..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};
