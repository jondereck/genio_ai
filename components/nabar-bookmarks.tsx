"use client";

import { cn } from "@/lib/utils";
import { Home, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchInput from "./search-input";

const NavbarBookmarks = () => {
  const router = useRouter();
  const routes = [
    { 
      label:"Home",
      icon:Home,
      href:"/bookmarks",
      pro: false,
    },
    { 
      label:"Create",
      icon:Plus,
      href:"/bookmarks/new",
      pro: false,
    },
  
  ]


  const onNavigate = (url: string, pro: boolean) => {
    //TODO

    return router.push(url);
  }

  const pathname = usePathname();
  return (  

    <div className="flex flex-col space-y-2">
     
     <div className="justify-start flex w-full flex-row-1 space-x-2 mt-2">
   
           {routes.map((route) => (
            <Link
              key={route.label}
              href={route.href}
            >
              <div className={cn("text-muted-foreground text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hove:bg-primary/10 rounded-lg transition ", pathname === route.href && "bg-primary/10 text-primary")}>
                <div className="flex flex-row gap-x-2 items-center flex-1">
                  <route.icon className="h-5 w-5"/>
                  {route.label}
                </div>
              </div>
            
            </Link>
          ))}
          <SearchInput/>
   
     </div>

    </div>
  );
}
 
export default NavbarBookmarks;