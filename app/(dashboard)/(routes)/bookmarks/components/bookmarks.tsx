"use client"


import { Alter, Bookmarks, Category } from "@prisma/client";
import Empty from "../../../../../components/Empty";
import { Card, CardFooter, CardHeader } from "../../../../../components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { LinkIcon, Tag } from "lucide-react";

import BookmarkHeader from "./bookmark-header";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import PaginationControls from "../../../../../components/pagination-control";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";


interface BookmarksProps {
  data: Bookmarks[];
}

const BookmarksPerPage = 10;

export const Bookmark = ({
  data,
}: BookmarksProps) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedBookmarks, setDisplayedBookmarks] = useState<Bookmarks[]>([]);
  const totalPages = Math.ceil(data.length / BookmarksPerPage);


  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // Calculate start and end indices based on currentPage
    const startIdx = (currentPage - 1) * BookmarksPerPage; // -13
    const endIdx = startIdx + BookmarksPerPage; // 1

    // Slice data to get displayed bookmarks for the current page
    const bookmarksForPage = data.slice(startIdx, endIdx);
    setDisplayedBookmarks(bookmarksForPage);

  }, [currentPage, data]);


  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <Empty
          label="No Ai tool found."
        />
      </div>
    )
  }

  return (
    <div className="flex-wrap ">
      <Separator className="mt-2" />
      <div className=" grid grid-cols-2  sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-5 mt-4 gap-2 justify-between items-center">
        {displayedBookmarks.map((item) => (
          <Card
            key={item.id}
            className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
          >
            <BookmarkHeader bookmarks={item} />
            <div>
              <CardHeader className="flex items-center   justify-center text-center text-muted-foreground">
                <Link href={item.url}>
                  <div className="relative  my-2 lg:w-32 lg:h-32 w-20 h-20" >
                    <Image
                      fill
                      src={item.src}
                      alt="alter"
                      className="border-solid border-2 rounded-full bg-white object-cover"
                    />
                  </div> </Link>
                <HoverCard >
                  <HoverCardTrigger>
                    <Button variant="link">
                      <div className="flex text-lg lg:text-xl font-bold ">
                        {item.name}
                      </div>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex">
                    <div className="flex-wrap bg-background/95 ">
                      {item.description}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </CardHeader>
            </div>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex items-center justify-start ">
                    <Tag className="w-3 h-3 mr-2" />
                    <p className="text-sm lowercase">
                      {item.tags && item.tags.length > 0 && item.tags.substring(0, Math.min(item.tags.length, 15))}...
                    </p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="text-xs font-light bg-background flex-auto">
                    {item.tags}
                  </div>
                </HoverCardContent>
              </HoverCard>
              {/* <div className="flex items-center">
              <LinkIcon className="w-3 h-3 mr-1" />
              <button
                className="text-primary"
              >
              </button>  
              </div> */}
            </CardFooter>
          </Card>
        ))}

      </div>
      {data.length > BookmarksPerPage && (
        <>
          <Separator className="mt-4" />
          <div className="  flex justify-center items-center">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

    </div>
  );
}

