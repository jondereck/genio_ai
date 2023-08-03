"use client";

import { Alter, Message } from "@prisma/client";
import { ChatHeader } from "./chat-header";

interface ChatClientProps {
  alter: Alter & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatClient = ({
  alter
}: ChatClientProps) => {
  return  ( 
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader
        alter={alter}
      />
    </div>
   );
}
 
