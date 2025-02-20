import Image from "next/image";

import SidebarRoutes from "./Sidebar_routes";
import UserDropdown from "../user-dropdown";

export default function Sidebar() {
  return (
    <div className="h-full border-r border-[#E9EAEB] bg-[#FFFFFF] flex flex-col overflow-y-auto py-6">
      <div className="px-4 pb-6">
        <Image
          src={"/CodeZen-Ai-logo.png"}
          alt="card"
          width={161}
          height={32}
          className=""
        />
      </div>

      <div className="flex flex-col gap-4 w-full h-full">
        <div className="px-4">
          <UserDropdown />
        </div>

        <SidebarRoutes />
      </div>
    </div>
  );
}
