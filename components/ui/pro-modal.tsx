'use client';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import useProModal from "../hooks/use-pro-modal";
import { Badge } from "./badge";
import { Check, Code, ImageIcon, MessageSquare, Music, Video, Zap } from "lucide-react";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const tools = [ 
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    label: "Image Generator",
    icon: ImageIcon,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    label: "Video Generator",
    icon: Video,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    label: "Music Generator",
    icon: Music,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    label: "Code Generator",
    icon: Code,
    color: "text-rose-700",
    bgColor: "bg-rose-700/10",
  },
  

]
const ProModal = () => {

  const proModal = useProModal();
  return (
    <Dialog 
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
      >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
          <div className="flex items-center gap-x-2 font-bold py-1">
          Upgrade to GenioAi
          <Badge variant="gold" className="uppercase text-sm py-1">
            Pro
          </Badge>
          </div>
          </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium ">
              {tools.map((tool) => (
                <Card key={tool.label}
                className="p-3 border-black flex items-center  justify-between">
                  <div className="flex flex-center gap-x-4"> 
                      <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                        <tool.icon className={cn("w-6 h-6",tool.color)}/>
                      </div>
                      <div className="flex items-center justify-center font-semibold text-sm">
                        {tool.label}
                      </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white border-0 rounded-lg shadow-md px-2 py-2 font-bold">
                  <Check  className="text-primary w-5 h-5 " />
                  </div>
                  
                </Card>
              ))}
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            size="lg"
            variant="gold"
            className="w-full ">
            Upgrade 
            <Zap className="w-4 h-4 ml-2 fill-white"/>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProModal;