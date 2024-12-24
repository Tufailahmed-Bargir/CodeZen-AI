"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const LoginForm = () => (
  <div className="border border-[#E9EAEB] rounded-xl bg-[#FFFFFF] w-full lg:w-[672px] lg:h-[602px]">
    <Tabs defaultValue="saas">
      <div className="px-5 py-9 flex flex-col items-center justify-center text-center gap-5 border-b border-[#D5D7DA]">
        <Image src="/codeant-logo.png" alt="card" width={201} height={40} />
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
        <TabsContent value="saas" className="w-full flex flex-col items-center">
          <LoginOptions
            providers={["github", "bitbucket", "azure-devops", "gitlab"]}
          />
        </TabsContent>
        <TabsContent
          value="selfHosted"
          className="w-full flex flex-col items-center"
        >
          <LoginOptions providers={["gitlab", "sso"]} />
        </TabsContent>
      </div>
    </Tabs>
  </div>
);

const LoginOptions = ({ providers }: { providers: string[] }) => (
  <div className="flex flex-col items-center w-full lg:w-[446px] gap-4">
    {providers.map((provider) => (
      <LoginButton key={provider} provider={provider} />
    ))}
  </div>
);

const LoginButton = ({ provider }: { provider: string }) => {
  const router = useRouter();
  const handleLogin = async () => {
    const res = await signIn(provider, { redirect: false });
    if (res?.error) {
      console.error(res.error);
    } else {
      router.push("/");
    }
  };

  const providerDetails = {
    github: { src: "/github.svg", alt: "gh", title: "Sign in with Github" },
    bitbucket: {
      src: "/bitbucket.svg",
      alt: "bb",
      title: "Sign in with Bitbucket",
    },
    "azure-devops": {
      src: "/azure-devops.svg",
      alt: "ad",
      title: "Sign in with Azure DevOps",
    },
    gitlab: { src: "/gitlab.svg", alt: "gl", title: "Sign in with GitLab" },
    sso: { src: "/sso.svg", alt: "sso", title: "Sign in with SSO" },
  };

  // @ts-expect-error: ignore this type
  const { src, alt, title } = providerDetails[provider];

  return (
    <Button variant="native" size="login" onClick={handleLogin}>
      <div className="flex items-center gap-2">
        <Image src={src} alt={alt} width={25} height={25} />
        {title}
      </div>
    </Button>
  );
};

export default LoginForm;
