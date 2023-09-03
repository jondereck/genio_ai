'use client';

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import {  Music } from "lucide-react";
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


const MusicPage = () => {
  const proModal = useProModal();
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

      const response = await axios.post("api/music", values);

      setMusic(response.data.audio)
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
            justify-center ">
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
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Textarea
                      className="border-0 outline-none focus-visible:ring-0
                      focus-visible:ring-transparent
                      bg-background resize-none p-2"
                      disabled={isLoading}
                      placeholder="Guitar solo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}

            />
            <Button
            variant="premium"
              className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-2 2xl:col-span-1 w-full p-2 lg:p-10"
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