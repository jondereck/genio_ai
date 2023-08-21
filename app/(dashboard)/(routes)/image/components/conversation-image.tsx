import Empty from "@/components/Empty";
import ImageLoaderSkeleton from "@/components/ImageLoader";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import useProModal from "@/hooks/use-pro-modal";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ConversationImageprops {
  images: string[];
  isLoading: boolean;
}

export const ConversationImage = ({images, isLoading}: ConversationImageprops) => {

  return (
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          xl:grid-cols-5 gap-4 mt-8 ">
            {images.map((src) => (
              <Card
                key={src}
                className="rounded-lg"
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
  );
}

