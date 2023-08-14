
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ChatCompletionRequestMessage } from "openai";

import { formSchema } from "./constants";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import useProModal from "@/hooks/use-pro-modal";

import { z } from "zod";


import { Separator } from "@/components/ui/separator";
import ConversationMessages from "@/components/conversation-messages";
import {ConversationForm} from "@/components/conversation-form";


export const ClientPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoading, setIsLoading ] = useState(false);

 

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);



    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally { 
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-2">
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-green-700"
        bgColor="bg-green-700/5"
      />
      <ConversationMessages isLoading={isLoading} messages={messages} />
      <ConversationForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};
