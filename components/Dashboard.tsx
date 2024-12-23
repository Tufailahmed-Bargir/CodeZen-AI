import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import Link from "next/link";

type Repository = {
  id: number;
  name: string;
  private: boolean;
  language: string | null;
  size: number;
  updated_at: string;
  html_url: string;
};

type UserSession = {
  accessToken: string;
};

async function getUser(): Promise<UserSession | null> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (session && session.accessToken) {
    return session as UserSession;
  }
  return null;
}

async function getRepositories(accessToken: string): Promise<Repository[]> {
  try {
    const response = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching repositories:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch repositories",
      );
    }
    throw error;
  }
}

export default async function DashboardPage() {
  const session = await getUser();

  if (!session || !session.accessToken) {
    redirect("/login");
  }

  let repos: Repository[] = [];
  try {
    repos = await getRepositories(session.accessToken);
  } catch (error: unknown) {
    console.error("Error in fetching repositories:", (error as Error).message);
    return (
      <div>
        <h1>Something went wrong!</h1>
        <p>We couldn&apos;t fetch your repositories. Please try again later.</p>
      </div>
    );
  }

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
                <Header totalRepos={repos.length} />
                <input
                  type="text"
                  placeholder="Search repositories"
                  className="bg-white w-[90%] md:w-[30%] p-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                {repos.map((repo) => (
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

function Header({ totalRepos }: { totalRepos: number }) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Repositories</h1>
        <p className="text-gray-500 mt-5">{totalRepos} total repositories</p>
      </div>
      <div className="flex flex-row p-4 m-4 gap-4 text-md">
        <Button imgSrc="/refresh.png" text="Refresh All" />
        <Button
          imgSrc="/plus.png"
          text="Add Repository"
          bgColor="bg-[#1470ef]"
          textColor="text-white"
        />
      </div>
    </div>
  );
}

type ButtonProps = {
  imgSrc: string;
  text: string;
  bgColor?: string;
  textColor?: string;
};

function Button({
  imgSrc,
  text,
  bgColor = "bg-white",
  textColor = "text-black",
}: ButtonProps) {
  return (
    <button
      className={`flex flex-row gap-2 h-max rounded-lg p-2 ${bgColor} ${textColor} items-center justify-start`}
    >
      <img src={imgSrc} alt="" />
      {text}
    </button>
  );
}

type TabProps = Repository;

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
          icon={<img src="/database.png" alt="" />}
        />
        <p>
          Updated{" "}
          {formatDistanceToNow(new Date(updated_at), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

type InfoItemProps = {
  text: string;
  // @ts-expect-error:please ignore this error
  icon: jSX.Element;
};

function InfoItem({ text, icon }: InfoItemProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <p className="text-gray-500 text-sm">{text}</p>
      {icon}
    </div>
  );
}
