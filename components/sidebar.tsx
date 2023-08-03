'use client';
import { cn } from "@/lib/utils";
// Add this import at the top of the Sidebar.tsx file
import { useEffect, useState } from "react";

import { Epilogue, Montserrat } from "next/font/google"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from "react-icons/bs";

import {
  MessageSquare,
  LayoutDashboard,
  ImageIcon,
  Video,
  Music,
  Code,
  Settings,
  VenetianMask,
  TvIcon
} from "lucide-react";
import FreeCounter from "./free-counter";
import Loading from "@/app/loading";
import { Button } from "./ui/button";


const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-white"
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-green-700"
  },
  {
    label: "Alter Ai Generator",
    icon: VenetianMask,
    href: "/alter",
    color: "text-amber-500"
  },
  {
    label: "Image Generator",
    icon: ImageIcon,
    href: "/image",
    color: "text-sky-500"
  },
  {
    label: "Video Generator",
    icon: Video,
    href: "/video",
    color: "text-red-500"
  },
  {
    label: "Music Generator",
    icon: Music,
    href: "/music",
    color: "text-purple-600"
  },
  {
    label: "Code Generator",
    icon: Code,
    href: "/code",
    color: "text-rose-700"
  },

  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-400"
  },
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
  onClose?: () => void;
}

const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
  onClose,
}: SidebarProps) => {
  const pathname = usePathname();
  const [useClientOpen, setUseClientOpen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // Adjust the breakpoint as per your requirements
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the isLargeScreen state on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinkClick = () => {

    if (onClose) {
      onClose();
    }
  }

  const handleUseClientClick = () => {
    setUseClientOpen(!useClientOpen);
  };

  return (
    <>
      {/* "Open Sidebar" button section */}
      {isLargeScreen && !useClientOpen && (
        <button onClick={handleUseClientClick}>
          <div className="fixed top-4 left-4 p-3 rounded-md text-white ">
            <BsLayoutSidebarInsetReverse size={25}/>
          </div>
        </button>
      )}


      {/* Render the "Use Client" content based on state */}
      {isLargeScreen && useClientOpen && (
        <div className=" py-4 flex flex-col h-full
      bg-[#111827] text-white">
          <div className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex items-center 
          pl-3 mb-14">
              <div className="relative w-10 h-10 mr-4">
                <Image
                  fill
                  alt="Logo"
                  src="/nlogo.png"
                />
              </div>
              <h1 className={cn("text-2xl font-bold", font.className)} >
                GenioAi
              </h1>
              <div className="pl-4">
                <Button
                variant="ghost"
                size="icon"
                onClick={handleUseClientClick}
              >
                <BsLayoutSidebarInset size={25} />
              </Button>
              </div>
              
            </Link>


            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  onClick={handleLinkClick}
                  href={route.href}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                    pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <FreeCounter
            apiLimitCount={apiLimitCount}
            isPro={isPro} />

        </div>
      )}


    </>
  );
};
export default Sidebar;