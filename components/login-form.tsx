"use client";
import Image from "next/image";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const LoginForm = () => {
  return (
    <div className="border border-[#E9EAEB] rounded-xl bg-[#FFFFFF] w-full lg:w-[672px] lg:h-[602px]">
      <Tabs defaultValue="saas">
        <div className="px-5 py-9 flex flex-col items-center justify-center text-center gap-5 border-b border-[#D5D7DA]">
          <Image
            src={"/codeant-logo.png"}
            alt="card"
            width={201}
            height={40}
            className=""
          />

          <div className="text-[24px] lg:text-[32px] font-semibold">
            Welcome to CodeAnt AI
          </div>

          <TabsList className="w-full lg:w-[624px] h-[60px] p-0 border">
            <TabsTrigger
              value="saas"
              className="w-full h-full text-[20px] font-semibold"
            >
              SAAS
            </TabsTrigger>

            <TabsTrigger
              value="selfHosted"
              className="w-full h-full text-[20px] font-semibold"
            >
              Self Hosted
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="py-6 px-5 w-full">
          <TabsContent
            value="saas"
            className="w-full flex flex-col items-center"
          >
            <div className="flex flex-col items-center w-full lg:w-[446px] gap-4">
              <LoginButton
                src={"/github.svg"}
                alt="gh"
                title={"Sign in with Github"}
                provider="github"
              />

              <LoginButton
                src={"/bitbucket.svg"}
                alt="bb"
                title={"Sign in with Bitbucket"}
                provider="bitbucket"
              />

              <LoginButton
                src={"/azure-devops.svg"}
                alt="ad"
                title={"Sign in with Azure DevOps"}
                provider="azure-devops"
              />

              <LoginButton
                src={"/gitlab.svg"}
                alt="gl"
                title={"Sign in with GitLab"}
                provider="gitlab"
              />
            </div>
          </TabsContent>

          <TabsContent
            value="selfHosted"
            className="w-full flex flex-col items-center"
          >
            <div className="flex flex-col items-center w-full lg:w-[446px] gap-4">
              <LoginButton
                src={"/gitlab.svg"}
                alt="gl"
                title={"Self Hosted GitLab"}
                provider="gitlab"
              />

              <LoginButton
                src={"/sso.svg"}
                alt="sso"
                title={"Sign in with SSO"}
                provider="sso"
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default LoginForm;

const LoginButton = ({
  src,
  alt,
  title,
  provider,
}: {
  src: string;
  alt: string;
  title: string;
  provider: string;
}) => {
  const router = useRouter();

  const handleLogin = async () => {
    if (provider === "github") {
      const res = await signIn("github", { redirect: false });
      if (res?.error) {
        console.error(res.error);
      } else {
        router.push("/");
      }
    }
    // Add handling for other providers (like bitbucket, azure-devops, etc.) if necessary.
  };

  return (
    <Button variant={"native"} size={"login"} onClick={handleLogin}>
      <div className="flex items-center gap-2">
        <Image src={src} alt={alt} width={25} height={25} />
        {title}
      </div>
    </Button>
  );
};
