'use client';

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import { MessageSquare, Music } from "lucide-react";
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
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio)
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
        title="Music Generator"
        description="Turn your prompt into music."
        icon={Music}
        iconColor="text-purple-600"
        bgColor="bg-purple-600/5"
      />
      <div className="px-4 lg:px-8">

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center
            justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!music && !isLoading && (
            <Empty
              label="No music generated. "
            />
          )}
          {music &&  (
            <audio 
              controls
              className="w-full mt-8"
              >
                <source src={music}/>
              </audio>
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
                      placeholder="Guitar solo"
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

export default MusicPage;