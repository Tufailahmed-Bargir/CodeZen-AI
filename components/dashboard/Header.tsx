// import { ButtonProps } from "@/lib/types";
import Button from "./Button";

export default function Header({
  totalRepos,
  onRefresh,
}: {
  totalRepos: number;
  onRefresh: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Repositories</h1>
        <p className="text-gray-500 mt-5">{totalRepos} total repositories</p>
      </div>
      <div className="flex flex-row gap-4 m-4 p-4 items-center">
        <Button
          ImageSrc="/refresh.svg"
          text="Refresh All"
          onClick={onRefresh}
        />
        <Button
          ImageSrc="/plus.svg"
          text="Add Repository"
          bgColor="bg-[#1470ef]"
          textColor="text-white"
        />
      </div>
    </div>
  );
}
