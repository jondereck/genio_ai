"use client";

import * as z from "zod";

import { Alter, Category } from "@prisma/client"
import { useForm } from "react-hook-form";
import { formSchema } from "../components/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import AlterEgoPage from "@/components/alter-page";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";

interface AlterFormProps {
  initialData: Alter | null;
  categories: Category[];
}



export const AlterForm = ({
  initialData,
  categories,

}: AlterFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    }

  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    //  max-w-3xl
    <div className="h-full p-4 space-y-2  mx-auto">
      <AlterEgoPage />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 w-full ">
            <div>
              <h3 className="text-lg font-medium">
                General Information
              </h3>
              <p className="text-sm text-muted-foreground">
                General information about your Alter Ai
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4  p-4">
                <FormControl>
                  <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Jose Rizal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    This is how your Alter AI will be named.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Writer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                  Short description for your Alter AI.
                  </FormDescription>
                </FormItem>
              )}
            />
             <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue 
                          defaultValue={field.value}
                          placeholder="Select category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your Alter AI.
                  </FormDescription>
                </FormItem>
              )}
            />

          </div>

        </form>
      </Form>
    </div>
  )
}