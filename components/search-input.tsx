"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/user-debounce";
import qs from "query-string";


const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");
  const tags = searchParams.get("tags")

  const [value, setValue] = useState(name || "");
  const debounceValue = useDebounce<string>(value, 200);

  const [tagValue, setTagValue ] = useState(tags || "");
  const debounceTagValue = useDebounce<string>(tagValue, 200);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    setTagValue(e.target.value);
  }

  useEffect(() => {
    const query = {
      name: debounceValue,
      categoryId: categoryId,
      tags: debounceTagValue,
    };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, {skipEmptyString: true, skipNull: true});

    return router.push(url)

  },[debounceValue, debounceTagValue, router, categoryId])

  return (  
    <div className="relative w-full">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground"/>
      <Input
        onChange={onChange}
        value={value}
        placeholder="Search..."
        className="pl-10 bg-primary/10 "
      />
    </div>
  );
}
 
export default SearchInput;