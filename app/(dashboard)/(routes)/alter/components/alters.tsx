"use client";

import { Alter, Bookmarks } from "@prisma/client";
import Empty from "../../../../../components/Empty";
import { Card, CardFooter, CardHeader } from "../../../../../components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import PaginationControls from "../../../../../components/pagination-control";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";



interface AlterProps {
  data: (Alter & {
    _count: {
      messages: number
    }
  })[];

}

const BookmarksPerPage = 10;

export const Alters = ({ data
}: AlterProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedBookmarks, setDisplayedBookmarks] = useState<Alter[]>([]);
  const totalPages = Math.ceil(data.length / BookmarksPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  };

  useEffect(() => {
    const startIdx = (currentPage - 1) * BookmarksPerPage; // -13
    const endIdx = startIdx + BookmarksPerPage; // 1

    const bookmarksForPage = data.slice(startIdx, endIdx);
    setDisplayedBookmarks(bookmarksForPage);
  }, [currentPage, data]);



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
     //@ts-ignore
    <div className="flex-wrap"> 
    <Separator className="mt-2"/>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2 mt-4">
       
        {displayedBookmarks.map((item) => (
          <Card
            key={item.id}
            className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
          >
            <Link href={`/chat/${item.id}`}>
              <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
                <div className="relative w-32 h-32">
                  <Image
                    fill
                    src={item.src}
                    alt="alter"
                    className="rounded-xl object-cover"
                  />
                </div>
                <p className="font-bold">
                  {item.name}
                </p>
                <p className="font-xs">
                  {item.description}
                </p>
              </CardHeader>
              <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                <p className="text-sm lowercase">
                  @{item.userName}
                </p>
                
                <div className="flex items-center">
                  <MessageSquare className="w-3 h-3 mr-1" />
                 
                 
                  {item._count.messages}


                </div>
              </CardFooter>
            </Link>

          </Card>
        ))}
      </div>     <Separator className="mt-2" />
      <div className="flex items-center justify-center">
   
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}


        />
      </div>

    </div>

  );
}

