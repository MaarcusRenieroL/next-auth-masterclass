"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {
        signIn("github", {
          callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
      }}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
