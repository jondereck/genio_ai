'use client';

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import useProModal from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark" || theme === "system");

  useEffect(() => {
    setIsDarkMode(theme === "dark" || theme === "system")
  }, [theme]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {

      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);


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
        title="Conversation"
        description="Out most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-green-700"
        bgColor="bg-green-700/5"
      />
      <div className="px-4 lg:px-8">

        <div className="space-y-4 mt-4">
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
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn("p-4 lg:p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? " border border-black/10 "
                    : "bg-muted"
                )}
              >
                <div className="hidden lg:block">
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                </div>

                <ReactMarkdown 
                            className="text-sm overflow-hidden leading-7"
                            components={{
                              pre: ({ node, ...props }) => (
                                <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                  <pre {...props} />
                                </div>
                              ),
                              code: ({ node, ...props }) => (
                                <code className="bg-black/10 rounded-lg p-1" {...props} />
                              ),
                              h1: ({ node, ...props }) => (
                                <h1 className="text-4xl font-bold my-4" {...props} />
                              ),
                              h2: ({ node, ...props }) => (
                                <h2 className="text-3xl font-semibold my-3" {...props} />
                              ),
                              h3: ({ node, ...props }) => (
                                <h3 className="text-2xl font-medium my-2" {...props} />
                              ),
                              // Add customizations for h4, h5, h6, etc. if needed.
                              a: ({ node, ...props }) => (
                                <a
                                  className="text-blue-500 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  {...props}
                                />
                              ),
                              blockquote: ({ node, ...props }) => (
                                <blockquote className="border-l-4 border-gray-400 pl-4 my-3" {...props} />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul className="list-disc list-inside my-3" {...props} />
                              ),
                              ol: ({ node, ...props }) => (
                                <ol className="list-decimal list-inside my-3" {...props} />
                              ),
                              li: ({ node, ...props }) => <li className="my-1" {...props} />,
                            }}

                            
                          >
                            {message.content || ""}
                          </ReactMarkdown>
              </div>
            ))}
          </div>

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
              w-full
              md:9/12
              lg:w-11/12
              p-4
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
              ${isDarkMode ? "bg-darkblue" : "bg-white"}
              `}
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">

                    <Textarea
                      className="border-0 outline-none 
                        overflow-auto
                       "
                      disabled={isLoading}
                      placeholder="Can you explain the Riemann Hypothesis in simple terms?"
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

export default ConversationPage;