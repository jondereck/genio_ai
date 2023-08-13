"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "../constants";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";


interface ChatFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const handleFormSubmit = (input: z.infer<typeof formSchema>) => {
    onSubmit(input);
    form.reset()
  }

  return (
    
    <div className="flex justify-center p-4  ">

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className={`
            fixed 
            bottom-0
            rounded-lg
            border
            w-full
            lg:w-1/2
            justify-center
            items-center
            py-2
            px-4
            mx-4
            lg:mx-0
            md:px-6
            focus-within:shadow-sm
            grid
            grid-cols-12
            gap-2 border-primary/10
            bg-background
            drop-shadow-md
            `}
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-10">
                <Textarea
                  className="border-0 outline-none focus-visible:ring-0
                  focus-visible:ring-transparent
                  bg-background resize-none p-2
                       "
                  disabled={isLoading}
                  placeholder="Can you explain the Riemann Hypothesis in simple terms?"
                  {...field}
                />
              </FormItem>
            )}
          />
          <Button
            variant="premium"
            className="col-span-12 lg:col-span-2"
            disabled={isLoading}
          >
            Generate
          </Button>
        </form>
      </Form>
    </div>

  );
};

export default ChatForm;
