"use client";

import Heading from "@/components/Heading";
import useProModal from "@/hooks/use-pro-modal";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { formSchema } from "../constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ConversationImage } from "./conversation-image";
import { ConversationForm } from "./conversation-form";

export const ClientPage = () => {
const proModal = useProModal();
const router = useRouter();
const [images, setImages ] = useState<string[]>([]);
const [isLoading, setIsLoading ] = useState(false);

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    setIsLoading(true);
    setImages([]);
    const response = await axios.post("api/image", values);

    const urls = response.data.map((image: { url: string }) => image.url);

    setImages(urls);

  } catch (error: any) {
    if (error?.response?.status === 403) {
      proModal.onOpen();
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    setIsLoading(false)
    router.refresh();
  }

}
  return ( 
    <div className="flex flex-col p-4 space-y-2"> 
      <Heading
        title="Image Generator"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-sky-500"
        bgColor="bg-sky-500/5"
      />
      <ConversationImage images={images} isLoading={isLoading}/>
      <ConversationForm onSubmit={onSubmit} isLoading={isLoading}/>
    </div>
   );
}
 
