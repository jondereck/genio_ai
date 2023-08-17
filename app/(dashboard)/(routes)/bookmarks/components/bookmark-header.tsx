"use client";

import { auth, currentUser, useUser } from "@clerk/nextjs";
import { Bookmarks } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuItem,DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { DeleteConfirmationModal } from "@/components/deletetion-confirmation";
import useConfirmationModal from "@/hooks/use-confirmation-modal";

interface BookmarkHeaderProps  {
  bookmarks: Bookmarks ;
}

const BookmarkHeader = ({
  bookmarks
}: BookmarkHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      await onDelete();
    
    } catch (error) {
      console.log(error,"Confirm delete unsucessful")
    } finally {
      setIsLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };


  const onDelete =  async() => {
    try {
      await axios.delete(`/api/bookmarks/${bookmarks.id}`);

      toast.success(`Success deleting ${bookmarks.name}`);

      router.refresh();
      router.push('/bookmarks')
      
    } catch (error) {
      toast.error("Something went wrong.")
    }
  } 


  return (
    <div className="relative">
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
           <DropdownMenuItem onClick={handleDelete}>
           <Trash2  className="w-4 h-4 mr-2"/>
           Delete
           </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
      )} 

      <DeleteConfirmationModal 
        isOpen={showDeleteConfirmation}
        title={`Are you sure you want to delete ${bookmarks.name} ?`}
        onConfirm={confirmDelete} // Pass the confirmDelete function here
        onCancel={cancelDelete}
        disabled={isLoading}
      />
      
    </div>

    </div>
    
  );
}
 
export default BookmarkHeader;