"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";


const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const LandingNavbar = () => {
  const { isSignedIn} = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between borderb border-solid">
        <Link href="/" className="flex items-center">
          <div className="relative mr-4 h-10 w-10">
            <Image 
              fill
              alt="Logo"
              src="/nlogo.png"
            />
          </div>
          <h1 className={cn("text-2xl font-bold text-white", 
          font.className)}>Genio Ai</h1>
        </Link>
        <div className="flex items-center gap-x-2">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button variant="outline" className="rounded-full">
              Get started
            </Button>
          </Link>
        </div>
    </nav>
  )
}