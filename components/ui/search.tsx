// components/Search.tsx
"use client";
import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void; // A function to handle the search
}

const Search = ({ onSearch }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call the parent function to update the filtered list
  };

  return (
    <input
      type="text"
      placeholder="Search repositories"
      className="bg-white w-[90%] md:w-[30%] p-2 border-[1px] border-gray-300 rounded-lg"
      value={searchQuery}
      onChange={handleChange}
    />
  );
};

export default Search;
