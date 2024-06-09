"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";

export function Header() {
  return (
    <div className="bg-slate-700">
      <div className="container mx-auto flex justify-between items-center py-3">
        <div className="flex items-center gap-3 text-2xl">
          <Image src="/next.svg" width={50} height={60} alt="sample" />
          ai-Notes
        </div>
        <div>
          <Unauthenticated>
            <SignInButton />
          </Unauthenticated>
          <Authenticated>
            <div className="flex gap-5">
              <UserButton />
              <ModeToggle />
            </div>
          </Authenticated>
        </div>
      </div>
    </div>
  );
}
