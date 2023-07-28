import { Avatar, AvatarImage } from "./ui/avatar";

const BotAvatar = () => {
  return ( 
    <Avatar className="h-10 w-10 rounded-full bg-slate-200" >
        <AvatarImage className="p-1" src="/nlogo.png" />
    </Avatar>
   );
}
 
export default BotAvatar;