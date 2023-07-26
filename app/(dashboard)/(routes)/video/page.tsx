'use client';

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";

const VideoPage = () => {
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
      //TODO: open Pro model
      console.log(error)
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
            justify-center bg-muted">
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
            className="
                rounded-lg
                fixed
                bottom-0
                bg-white
                border
                w-full
                lg:w-10/12
                p-4
                md:px-6
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0
                        focus-visible:ring-transparent "
                      disabled={isLoading}
                      placeholder="Clown fish swimming under the cave"
                      {...field}
                    />
                  </FormControl>
                </FormItem>

              )}

            />
            <Button
              variant="premium"
              className="col-span-12  lg:col-span-2 w-full"
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