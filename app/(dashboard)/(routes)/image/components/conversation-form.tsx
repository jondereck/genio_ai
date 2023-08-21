"use client";
import { z } from "zod";
import { amountOptions, formSchema, resolutionOptions } from "../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { SelectItem, Select, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface ConversationFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean
}
export const ConversationForm = ({
  onSubmit,
  isLoading,
}: ConversationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512"
    }
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      await onSubmit(values);
      form.reset();
    } catch (error) {
      console.log("Error")
    }
  }
  return (
    <div className="flex justify-center items-center p-4">
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
         
          
          gap-2 border-primary/10
          bg-background
          drop-shadow-md
          col-span-12
          lg:col-span-2
              `}
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-10 w-full">
                <FormControl className="m-0 p-0">
                  <Input
                    className="border-0 outline-none focus-visible:ring-0
                        focus-visible:ring-transparent bg-background"
                    disabled={isLoading}
                    placeholder="A picture of a tree but made of ice cream"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between">
            <div className="flex space-x-2 lg:col-span-12 col-span-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <Button
              variant="premium"
              className="relative lg:absolute lg:top-6 lg:right-2 col-span-12  lg:col-span-2 "
              disabled={isLoading}
            >
              Generate
            </Button>
          </div>
        </form>
      </Form>
    </div>);
}

