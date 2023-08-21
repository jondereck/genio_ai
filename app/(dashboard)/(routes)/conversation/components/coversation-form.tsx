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
import { toast } from "react-hot-toast";


interface ChatFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
}

export const ConversationForm: React.FC<ChatFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Attempt to submit the form
      await onSubmit(values);
      
      // If the submission was successful, reset the form
      form.reset();
    } catch (error) {
      // Handle errors that occur during submission
      console.error('Submission error:', error);
  
      // Optionally, display an error message to the user
      // errorMessageElement.textContent = 'An error occurred. Please try again.';
    }
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
            md:w-1/2
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


