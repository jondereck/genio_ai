'use client';

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import { Code, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
import ReactMarkdown from "react-markdown";
import useProModal from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

const CodePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const  [messages, setMessages ] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
   }finally {
      router.refresh();
   }

  }
  return ( 
    <div>
      <Heading 
        title="Code Generator"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-rose-700"
        bgColor="bg-rose-700/5"
      />
      <div className="px-4 lg:px-8">
        
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center
            justify-center bg-muted">
              <Loader/>
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty 
              label="No code generated. "
            />
          )}
          <div className="flex flex-col-reverse gap-y-4">
                  {messages.map((message) => (
                    <div 
                    key={message.content}
                    className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                    message.role === "user" 
                      ? "bg-white border border-black/10 " 
                      : "bg-muted"
                    )}
                    >
                      {message.role === "user"
                        ? <UserAvatar/>
                        : <BotAvatar/>
                      } 
                          <ReactMarkdown 
                            className="text-sm overflow-hidden leading-7"
                            components={{
                              pre:({ node, ...props}) => (
                                <div className="overflow-auto w-full my-2 
                                bg:black/10 p-2 rounded-lg">
                                  <pre {...props} />
                                </div>
                              ),
                              code:({node, ...props}) => (
                                <code className="bg-black/10 rounded-lg p-1
                                " {...props} />
                              )
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
              className="
                rounded-lg
                fixed
                bottom-0
                bg-white/5
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
                        placeholder="What is the purpose of usestate on react?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                )}
              
              />
              <Button 
                variant="premium"
                className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-2 2xl:col-span-1 w-full"
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
 
export default CodePage;