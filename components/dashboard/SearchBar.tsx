import Image from "next/image";

export default function SearchBar({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) {
  return (
    <div className="relative w-[90%] md:w-[30%]">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search repositories"
        className="bg-white w-full p-2 border-[1px] border-gray-300 rounded-lg pl-10"
      />
      <Image
        src="/search.svg"
        alt="Search icon"
        width={20}
        height={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
    </div>
  );
}
