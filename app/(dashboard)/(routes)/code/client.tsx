"use client";

import useProModal from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { z } from "zod";
import { formSchema } from "./constants";
import { toast } from "react-hot-toast";
import axios from "axios";


export const ClientPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [ messages, setMessages ] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoading, SetIsLoading ] = useState(false);


  const  handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try { 
      SetIsLoading(true);

      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt
      }

      const newMessages = [ ...messages, userMessage]

      const response = await axios.post("/api/code", {
        messages: newMessages
      })

      setMessages((current) => [...current, userMessage, response.data ])

      
    } catch (error: any) {
      if(error?.response?.status === 403 ) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.")
      } 
      
    } finally {
        SetIsLoading(false);
        router.refresh();
      }
  }

  return (
    <div className="flex flex-col p-4 space-y-2">

    </div>
    
    );
}

