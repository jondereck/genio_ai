"use client";

import { auth, currentUser, useUser } from "@clerk/nextjs";
import { Bookmarks } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuItem,DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface BookmarkHeaderProps  {
  bookmarks: Bookmarks ;
}

const BookmarkHeader = ({
  bookmarks
}: BookmarkHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();


  const onDelete =  async() => {
    try {
      await axios.delete(`/api/bookmarks/${bookmarks.id}`);

      toast.success("Success.");

      router.refresh();
      router.push("/bookmarks");
      
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  return (
    <div className=" absolute  flex justify-between w-auto items-center border-primary/10">
      { user?.id === bookmarks.userId && (
         <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button variant="ghost" size="icon">
             <MoreVertical />
           </Button>
         </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
           <DropdownMenuItem onClick={() => router.push(`/bookmarks/${bookmarks.id}`)}>
           <Edit2  className="w-4 h-4 mr-2"/>
           Edit
           </DropdownMenuItem>
           <DropdownMenuItem onClick={onDelete}>
           <Trash2  className="w-4 h-4 mr-2"/>
           Delete
           </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
      )} 
    </div>
  );
}
 
export default BookmarkHeader;