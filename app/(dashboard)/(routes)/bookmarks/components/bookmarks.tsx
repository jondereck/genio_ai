"use client"


import { Alter, Bookmarks, Category } from "@prisma/client";
import Empty from "../../../../../components/Empty";
import { Card, CardFooter, CardHeader } from "../../../../../components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { LinkIcon } from "lucide-react";

import BookmarkHeader from "./bookmark-header";


interface BookmarksProps {
  data: Bookmarks[]
}

export const Bookmark = ({ data
}: BookmarksProps) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <Empty
          label="No alters found."
        />
      </div>
    )
  }

  return (
    <div className="absolute grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
      
      {data.map((item) => (
      
        <Card
          key={item.id}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        > 
          <BookmarkHeader  bookmarks={item}/>
          <div>
          <Link href={item.description}>
          <CardHeader className="flex items-center  justify-center text-center text-muted-foreground"> 
            <div className="relative w-16 h-16">
              <Image
                fill
                src={item.src}
                alt="alter"
                className=" border-solid border-2 rounded-xl object-cover"
              />
            </div>
              <p className="font-bold">
                {item.name}
              </p>
          </CardHeader>
          </Link>
          </div>
          
          <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
            <p className="text-sm lowercase">
              {item.categoryId}
            </p>
           
            <div className="flex items-center">
              <LinkIcon className="w-3 h-3 mr-1" />
              <button
                className="text-primary"
              >
                </button>
            </div>
          
          </CardFooter>

        
        </Card>
       
      ))}
    
    </div>
  );
}

