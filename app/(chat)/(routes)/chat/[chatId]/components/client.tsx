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
      const systemMessage: ChatMessageProps = {
        role: "system",
        content: completion,
      };
      setMessages((current) => [ ...current, systemMessage ]);
      setInput("");

      router.refresh();
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
 
