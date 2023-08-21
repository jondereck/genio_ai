import { Sparkles } from "lucide-react";

export const NewModal = () => {
  return ( 
    <div className=" mx-4 flex justify-center items-center">
      <span className="text-red-500 font-bold animate-pulse">New</span>
      <Sparkles className="w-5 h-5 text-yellow-500 animate-spin-slow" />
    </div>
  );
}
