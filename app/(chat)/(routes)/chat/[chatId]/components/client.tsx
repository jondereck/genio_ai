"use client";

import { useCompletion } from "ai/react";
import { Alter, Message } from "@prisma/client";
import { ChatHeader } from "./chat-header";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ChatForm } from "./chat-form";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import ChatMessages from "./chat-messages";
import { ChatMessageProps } from "./chat-message";
import useProModal from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

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
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages ] = useState<ChatMessageProps[]>(alter.messages)

  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput
  } = useCompletion ({
    api: `/api/chat/${alter.id}`,
    onFinish(prompt, completion) {
      try {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };
        setMessages((current) => [...current, systemMessage]);
        setInput("");
      
        router.refresh();
      } catch (error: any) {
        console.error("Caught error:", error); // Add this line for logging
        if (error?.response?.status === 403) {
          console.log("Error status is 403"); // Add this line for logging
          proModal.onOpen();
        } else {
          console.log("Other error occurred"); // Add this line for logging
          toast.error("Something went wrong.");
        }
      }
      
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMesssage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [ ...current, userMesssage]);

    handleSubmit(e);
  }
  
  return  ( 
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader
        alter={alter}
      />
      <ChatMessages
        alter={alter}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm 
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
      
    </div>
   );
}
 
