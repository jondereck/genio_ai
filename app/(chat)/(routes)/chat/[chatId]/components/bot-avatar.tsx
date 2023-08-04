import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface BotAvatarProps {
  src: string;
  small?: boolean;
}

export const BotAvatar = ({
  src,
  small
}: BotAvatarProps) => {
  return (
    <Avatar className={` ${small ? "h-8 w-8" : "h-12 w-12"}`}>
      <AvatarImage src={src}/>
    </Avatar>
  )
}