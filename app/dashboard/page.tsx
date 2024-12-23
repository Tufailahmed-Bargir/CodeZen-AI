import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import RepositoiresList from "../../components/repositories";

export default function DashboardPage() {
  return (
    <div className="flex items-center h-full w-full">
      {/* Navbar for smaller screens */}
      <div className="block lg:hidden">
        <Navbar />
      </div>

      {/* Sidebar for larger screens */}
      <div className="hidden lg:flex h-full w-[242px] flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="lg:bg-[#FAFAFA] pt-16 lg:pt-0 lg:pl-[242px] h-full w-full">
        <div className="lg:p-6 h-full lg:max-w-screen-2xl lg:mx-auto w-full">
          <RepositoiresList />
        </div>
      </div>
    </div>
  );
};

 
