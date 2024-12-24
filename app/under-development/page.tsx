import Sidebar from "@/components/sidebar/Sidebar";

export default function Page() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 justify-center items-center">
        <h1 className="bold text-2xl">Under Development</h1>
      </div>
    </div>
  );
}
