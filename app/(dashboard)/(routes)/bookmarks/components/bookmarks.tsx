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
    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-4 gap-2">

      {data.map((item) => (

        <Card
          key={item.id}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <BookmarkHeader bookmarks={item} />
          <div>

            <CardHeader className="flex items-center   justify-center text-center text-muted-foreground">
              <Link href={item.url}>
                <div className="relative  my-2 w-32 h-32">
                  <Image
                    fill
                    src={item.src}
                    alt="alter"
                    className="border-solid border-2 rounded-xl object-cover"
                  />
                </div> </Link>
              <HoverCard >
                <HoverCardTrigger>
                  <Button variant="link">
                    <p className="text-lg lg:text-xl font-bold whitespace-nowrap">
                      {item.name}
                    </p>
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
                  {item.tags && item.tags.length > 0 && item.tags.substring(0, Math.min(item.tags.length, 20))}...
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
  );
}

