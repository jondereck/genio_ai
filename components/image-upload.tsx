"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?:  boolean
}

export const  ImageUpload = ({
  value,
  onChange,
  disabled
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  },[]);

  if (!isMounted) {
    return false;
  }

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      
      <CldUploadButton
        onUpload={(result:any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1
        }}
       uploadPreset="g5ph7tx7" 
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg flex flex-col space-y-2 items-center justify-center hover:opacity-75">
          <div className="relative h-40 w-40">
            <Image  
              alt="Upload"
              fill
              src={value || "/placeholder.svg"}
              className="rounded-lg object-cover"

            />
          </div>
        </div>
        
      </CldUploadButton>

    </div>
  )
}