"use client";

import { useState, useEffect } from "react";
import { getRepositories, getUser } from "@/app/Actions/action";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { ButtonProps, InfoItemProps, Repository, TabProps } from "@/lib/types";

export default function DashboardPage() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getUser();
      // @ts-expect-error: ignore this type
      const fetchedRepos: Repository[] = await getRepositories(
        // @ts-expect-error: ignore this type
        session.accessToken,
      );
      setRepos(fetchedRepos);
      setFilteredRepos(fetchedRepos);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRepos(
      repos.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, repos]);

  const refreshRepositories = async () => {
    const session = await getUser();
    // @ts-expect-error: ignore this type
    const refreshedRepos: Repository[] = await getRepositories(
      // @ts-expect-error: ignore this type
      session.accessToken,
    );
    setRepos(refreshedRepos);
    setFilteredRepos(refreshedRepos);
  };

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
          <div className="bg-[#fafafa] w-full h-[100vh] md:overflow-scroll">
            <div className="md:ml-[2%] mr-[2%] mt-[2%] rounded-lg flex flex-col gap-1">
              <div className="bg-white pt-5 rounded-md flex flex-col w-full gap-4 md:pl-5 md:pb-5 pl-3 pb-3">
                <Header
                  totalRepos={filteredRepos.length}
                  onRefresh={refreshRepositories}
                />

                <div className="relative w-[90%] md:w-[30%]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search repositories"
                    className="bg-white w-full p-2 border-[1px] border-gray-300 rounded-lg pl-10"
                  />
                  <Image
                    src="/search.svg"
                    alt="search"
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-1">
                {filteredRepos.map((repo) => (
                  <Tab key={repo.id} {...repo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({
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
      <div className="flex flex-row gap-4 m-4 p-4  items-center">
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

function Button({
  ImageSrc,
  text,
  onClick,
  bgColor = "bg-white",
  textColor = "text-black",
}: ButtonProps) {
  return (
    <button
      className={`flex flex-row gap-2 h-max rounded-lg p-2 ${bgColor} ${textColor} items-center justify-start`}
      onClick={onClick}
    >
      <Image src={ImageSrc} alt="this is some image" width={20} height={20} />
      {text}
    </button>
  );
}

function Tab({
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
            <Image src="/stack.svg" alt="stack image" width={15} height={15} />
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

function InfoItem({ text, icon }: InfoItemProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <p className="text-gray-500 text-sm">{text}</p>
      {icon}
    </div>
  );
}
