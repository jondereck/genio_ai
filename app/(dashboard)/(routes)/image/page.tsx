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
import { ClientPage } from "./components/client";




const ImagePage = () => {
  return (
    <div>
      <ClientPage/>
    </div>
  );
}

export default ImagePage;