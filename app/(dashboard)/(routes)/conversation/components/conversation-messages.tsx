"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { CodeWithCopy } from "@/components/code-copy";
import Loader from "@/components/Loader";
import Empty from "@/components/Empty";
import ChatMessage from "@/app/(chat)/(routes)/chat/[chatId]/components/chat-message";
import { Separator } from "@/components/ui/separator";


interface ConversationMessagesProps {
  messages: ChatCompletionRequestMessage[];
  isLoading: boolean
}

const ConversationMessages = (
{
messages,
isLoading 
}: ConversationMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);
 

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  },[messages.length])

  return (
    <div className="flex-1 overflow-y-auto pr-4 ">
      <div className="space-y-4 mt-4">
     
        <div className="flex flex-col gap-y-4">
        {messages.map((message) => (
    <div
      key={message.content}
      className={cn(
        "p-4 md:p-2 lg:p-8 w-full flex gap-x-10 rounded-2xl",
        message.role === "user"
          ? "border border-black/10 items-end justify-end"
          : "bg-muted items-end"
      )}
    >
      <div className="hidden lg:block">
        {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
      </div>
      <CodeWithCopy code={message.content || ""} />
    </div>
    
  ))}
    <Separator className="mt-10 lg:mt-20 bg-background"/>
        </div>

        {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center
            justify-center ">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty
              label="No conversation stated. "
            />
          )}
      </div>
      <div ref={scrollRef}/>
    
    </div>
  );
};

export default ConversationMessages;
