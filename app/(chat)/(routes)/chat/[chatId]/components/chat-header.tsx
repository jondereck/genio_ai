"use client";

import { Button } from "@/components/ui/button";
import { Alter, Message } from "@prisma/client";
import { ChevronLeft, Edit2, MessagesSquare, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { BotAvatar } from "./bot-avatar";
import { useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuItem,DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import axios from "axios";


interface ChatHeaderProps {
  alter: Alter & {
    messages: Message[];
    _count: {
      messages: number;
    }
  };
};

export const ChatHeader = ({
  alter
}: ChatHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();

  const onDelete =  async() => {
    try {
      await axios.delete(`/api/alter/${alter.id}`);

      toast.success("Success.");

      router.refresh();
      router.push("/alter");
      
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }
  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
        <div className="flex gap-x-2 items-center">
          <Button size="icon" variant="ghost" 
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-8 w-8"/>
          </Button>
          <BotAvatar src={alter.src}/>
          <div className="flex flex-col gap-y-1">
            <div className="flex flex-center gap-x-2">
              <p className="font-bold"> 
                {alter.name}
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <MessagesSquare className="w-4  h-3 mr-1"/>
                { alter._count.messages}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Created by { alter.userName }
            </p>
          </div>
        </div>
        {user?.id === alter.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/alter/${alter.id}`)}>
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

