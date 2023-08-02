'use client';

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import Image from "next/image";


import { SelectItem, Select, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import ImageLoaderSkeleton from "@/components/ImageLoader";
import useProModal from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";



const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark" || theme === "system" );

  useEffect(() => {
    setIsDarkMode(theme === "dark" || theme === "system" );
  }, [theme]);


  const [isLightMode, setIsLightMode] = useState(theme === "light" || theme === "system");

  useEffect(() => {
    setIsLightMode(theme === "light" || theme === "system")
  }, [theme]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512"
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);

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
        title="Image Generator"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-sky-500"
        bgColor="bg-sky-500/5"
      />
      <div className="px-4 lg:px-8">

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />

            </div>
          )}
        
          {images.length === 0 && !isLoading && (
            <Empty
              label="No images generated. "
            />
          )}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3
          xl:grid-cols-4 gap-4 mt-8 ">
            {images.map((src) => (
              <Card
                key={src}
                className="rounded-lg overflow mb-52"
              >
                <div className="relative aspect-square">
                  {isLoading ? <ImageLoaderSkeleton /> : (
                    <Image
                      alt="Image"
                      fill
                      src={src}
                      className="bg-slate-200 rounded"
                    />
                  )}
                </div>
                <CardFooter className="p-2 ">
                  <Button
                    onClick={() => window.open(src)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                  </Button>
                </CardFooter>
              </Card>
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
            hover:shadow-xl
            w-11/12
            py-2
            px-4
            mx-4
            lg:mx-0
            md:px-6
            focus-within:shadow-sm
                grid
                grid-cols-4
                gap-2
                ${isDarkMode ? "bg-darkblue" : "bg-white"}
                ${isLightMode ? "bg-white" : "bg-darkblue"}
              `}
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
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
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
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
                <FormItem className="col-span-12 lg:col-span-2">
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
            <Button
            variant="premium"
              className="col-span-12  lg:col-span-2 w-full "
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

export default ImagePage;