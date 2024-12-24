"use server";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";

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

export async function getUser(): Promise<UserSession | null> {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (session && session.accessToken) {
    return session as UserSession;
  }
  return null;
}

export async function getRepositories(
  accessToken: string,
): Promise<Repository[]> {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const response = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const repos = response.data;
    const UserId = await prisma.user.findUnique({
      where: {
        // @ts-expect-error: ignore this type
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });
    type RepoDataa = {
      githubId: number;
      name: string;
      fullName: string;
      description: string | null;
      url: string;
      starCount: number;
      isPrivate: boolean;
      userId: string;
    };
    type GitHubRepo = {
      id: number;
      name: string;
      full_name: string;
      description: string | null;
      html_url: string;
      stargazers_count: number;
      private: boolean;
    };
    const repoData: RepoDataa[] = repos.map((repo: GitHubRepo) => ({
      githubId: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || null,
      url: repo.html_url,
      starCount: repo.stargazers_count || 0,
      isPrivate: repo.private,
      // @ts-expect-error: ignore this type
      userId: UserId.id,
    }));

    const result = await prisma.repository.createMany({
      data: repoData,
      skipDuplicates: true,
    });
    if (!result) {
      console.error("Failed to insert repositories into the database.");
    }
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
