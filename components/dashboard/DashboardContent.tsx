import Header from "./Header";
import Tab from "./Tab";
import SearchBar from "./SearchBar";
import { Repository } from "@/lib/types";

export default function DashboardContent({
  filteredRepos,
  searchQuery,
  setSearchQuery,
  refreshRepositories,
}: {
  filteredRepos: Repository[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refreshRepositories: () => void;
}) {
  return (
    <div className="bg-[#fafafa] w-full h-[100vh] md:overflow-scroll">
      <div className="md:ml-[2%] mr-[2%] mt-[2%] rounded-lg flex flex-col gap-1">
        <div className="bg-white pt-5 rounded-md flex flex-col w-full gap-4 md:pl-5 md:pb-5 pl-3 pb-3">
          <Header
            totalRepos={filteredRepos.length}
            onRefresh={refreshRepositories}
          />
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          {filteredRepos.map((repo) => (
            <Tab key={repo.id} {...repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
