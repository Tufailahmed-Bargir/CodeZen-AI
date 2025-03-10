"use client";

import Image from "next/image";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen fixed grid grid-cols-1 lg:grid-cols-2">
      {/* Static Images */}
      <div className="w-full h-full hidden lg:flex items-center justify-center border-r border-[#D8DAE5] bg-[#FFFFFF]">
        <Image
          src={"/CodeZen-Ai.svg"}
          alt="CodeZen-Ai"
          width={284}
          height={319}
          className="fixed bottom-0 left-0"
        />

        <Image
          src={"/login-card.png"}
          alt="card"
          width={474}
          height={322}
          className=""
        />
      </div>

      {/* Auth Form with Tabs */}
      <div className="w-full px-4 py-6 bg-[#FAFAFA]">
        <div className="h-full w-full flex flex-col items-center justify-center gap-8">
          <LoginForm />

          <span className="text-[14px] lg:text-base">
            By signing up you agree to the <b>Privacy Policy</b>.
          </span>
        </div>
      </div>
    </div>
  );
}
