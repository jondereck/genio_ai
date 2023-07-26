'use client';

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { SelectItem, Select, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import ImageLoaderSkeleton from "@/components/ImageLoader";



const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

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
      //TODO: open Pro model
      console.log(error)
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
              <ImageLoaderSkeleton /> 

            </div>
          )}
        
          {images.length === 0 && !isLoading && (
            <Empty
              label="No images generated. "
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card
                key={src}
                className="rounded-lg overflow-hidden"
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
                <CardFooter className="p-2">
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
            className="
                rounded-lg
                fixed
                bottom-0
                bg-white
                border
                w-full
                md:w-8/12
                2xl:w-10/12
                p-4
                md:px-6
                focus-within:shadow-sm
                grid
                grid-cols-4
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
                      placeholder="A picture of a tree but made of ice cream"
                      {...field}
                    />
                  </FormControl>
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

export default ImagePage;