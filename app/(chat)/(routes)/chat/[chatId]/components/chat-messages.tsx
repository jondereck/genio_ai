"use client";

import { Alter } from "@prisma/client";
import ChatMessage, { ChatMessageProps } from "./chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";


interface ChatMessagesProps {
  isLoading: boolean;
  alter: Alter; 
  messages: ChatMessageProps[];
}

const ChatMessages = ({
  isLoading,
  alter,
  messages = [],
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [fakeLoading, setFakeLoading ] = useState(messages.length === 0 ? true : false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
    
    return () => {
      clearTimeout(timeout);
    }
  },[]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  },[messages.length])


  return ( 
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={alter.src}
        role="system"
        content={`Hello, I am ${alter.name}, ${alter.description}`}
      />
      { messages.map((message) => (
        <ChatMessage 
          key={message.content}
          role={message.role}
          content={message.content}
          src={message.src}
        />
      ))}

      { isLoading && (
        <ChatMessage 
          role="system"
          src={alter.src}
          isLoading
        />
      )}
      <div ref={scrollRef}/>
    </div>
   );
}
 


export default ChatMessages;