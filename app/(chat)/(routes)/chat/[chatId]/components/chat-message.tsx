"use client";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { BotAvatar } from "./bot-avatar";
import Loading from "@/app/loading";
import { BeatLoader } from "react-spinners";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export interface ChatMessageProps {
  role: "system" | "user";
  isLoading?: boolean;
  content?: string;
  src?: string;
}

const ChatMessage = ({
  role,
  isLoading,
  content,
  src,
}: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to the clipboard"
    });
  }
  return (  
    <div className={cn("group flex items-start gap-x-3 p-4 w-full",
    role === "user" && "justify-end")}>
      { role !== "user" && src && <BotAvatar small src={src}/> }
      <div className="rounded-md px-4 py-2 max-w-sm texm-sm bg-primary/10"> 
      { isLoading 
      ? <BeatLoader
        size={5}
        color={theme ===  "light" ? "black" : "white"}
        />
      : content}
      </div>
      { role === "user" && <UserAvatar />}
      { role === "system" && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost"
        >
          <Copy className="h-4 w-4"/>
        </Button>
      )}
    </div>
  );
}
 
export default ChatMessage;