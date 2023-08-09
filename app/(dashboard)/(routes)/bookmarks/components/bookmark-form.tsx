"use client";

import * as z from "zod";

import { Alter, Bookmarks, BookmarksCategory, Category } from "@prisma/client"
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import AlterEgoPage from "@/components/alter-page";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useProModal from "@/hooks/use-pro-modal";
import BookmarkNavPage from "@/components/bookmarks-page";



interface BookmarkFormProps {
  initialData: Bookmarks | null;
  categories: BookmarksCategory[];
}



export const BookmarkForm = ({
  initialData,
  categories,

}: BookmarkFormProps) => {
  const initialTags = ["jon", "teo"];
  const router = useRouter();
  const proModal = useProModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      src: "",
      categoryId: undefined,
      tags: "",
      
    }

  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    
      if (initialData) {
        // update alter  funcitonality
        await axios.patch(`/api/bookmarks/${initialData.id}`, values);
        
      } else {
        // create alter functionality
        await axios.post("/api/bookmarks", values);
      }

      // toast({
      //   description: "Success.",
      // });

      toast.success("Success.")

      router.refresh();
      router.push("/bookmarks")
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.")
      } 
      
    }
  }


  return (
    //  max-w-3xl
    <div className=" space-y-2 p-4 mx-auto ">
      <BookmarkNavPage/>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10">
          <div className="space-y-2 w-full ">
            <div>
              <h3 className="text-lg font-medium">
                General Information
              </h3>
              <p className="text-sm text-muted-foreground">
              Easily add and organize your favorite AI tools for quick access whenever you need them.
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
                      placeholder="Chat Gpt"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Provide a name for your AI tool.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="https://chat.openai.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                  Enter the URL link for your AI Tool.
                  </FormDescription>
                </FormItem>
              )}
            />
           <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue defaultValue={field.value} placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent  className="flex h-32 overflow-auto">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                  Choose a category for your AI Tool.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input className="bg-background" 
                      disabled={isLoading}
                      placeholder="Tags"
                      {...field}
                    
                    />
                    
                  </FormControl> 
                  <FormMessage/>
                    <FormDescription>
                      Tags 
                    </FormDescription>
                </FormItem>
              )}
            
            />

          </div>
      
          <div className="w-full flex justify-center">
            <Button 
              size="lg" 
              disabled={isLoading}>
              {initialData ? "Update AI Tool Bookmark" : "Save AI Tool Bookmark"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}