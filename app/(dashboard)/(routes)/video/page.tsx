'use client';

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import useProModal from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";


const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });



  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);

      setVideo(response.data[0])
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }

  }
  return (
    <div>
      <Heading
        title="Video Generator"
        description="Turn your prompt into video."
        icon={VideoIcon}
        iconColor="text-red-500"
        bgColor="bg-red-500/5"
      />
      <div className="px-4 lg:px-8">

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center
            justify-center">
              <Loader />
            </div>
          )}
          {!video && !isLoading && (
            <Empty
              label="No video generated. "
            />
          )}
          {video && (
            <video className="w-full aspect-video mt-8 rounded-lg border 
            bg-black" controls>
              <source src={video} />
            </video>
          )}

        </div>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`
            rounded-lg
            fixed
            bottom-0
            border
            w-11/12
            py-2
            px-4
            mx-4
            lg:mx-0
            md:px-6
            focus-within:shadow-sm
            grid
            grid-cols-12
            gap-2
            bg-background
            `}
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Textarea
                      className="border-0 outline-none focus-visible:ring-0
                      focus-visible:ring-transparent
                      bg-background resize-none p-2"
                      disabled={isLoading}
                      placeholder="Clown fish swimming under the cave"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}

            />
            <Button
              variant="premium"
              className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-2 2xl:col-span-1 w-full bottom-0 p-2 lg:p-10"
              disabled={isLoading}
            >
              
              Generate
             
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default VideoPage;