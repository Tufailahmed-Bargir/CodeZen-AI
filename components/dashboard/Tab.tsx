import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { TabProps } from "@/lib/types";
import InfoItem from "./InfoItem";

export default function Tab({
  name,
  private: isPrivate,
  language,
  size,
  updated_at,
  html_url,
}: TabProps) {
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white md:p-5 p-3 transition-all ease-linear duration-50 hover:bg-[#f5f5f5]">
      <div className="flex flex-row items-center gap-3">
        <Link
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[1.2rem] hover:underline"
        >
          {name}
        </Link>
        <span className="text-[14px] text-[#175CD3] border bg-[#EFF8FF] border-[#B2DDFF] rounded-full px-2 py-0.5">
          {isPrivate ? "Private" : "Public"}
        </span>
      </div>
      <div className="flex flex-row gap-5 md:gap-10">
        <InfoItem
          text={language || "Unknown"}
          icon={<div className="rounded-[5rem] bg-[#1470ef] w-2 h-2"></div>}
        />
        <InfoItem
          text={`${(size / 1024).toFixed(1)} MB`}
          icon={
            <Image src="/stack.svg" alt="stack icon" width={15} height={15} />
          }
        />
        <p>
          Updated{" "}
          {formatDistanceToNow(new Date(updated_at), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
