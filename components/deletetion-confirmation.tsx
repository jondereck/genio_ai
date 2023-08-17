"use client";

import useConfirmationModal from "@/hooks/use-confirmation-modal";
import { Button } from "./ui/button";
import { DialogTitle, Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog";


interface DeleteConfirmationModalProps {
  title: string;
  isOpen: boolean
  onCancel: () => void;
  onConfirm: () => void;
  disabled?: boolean;
}

export const DeleteConfirmationModal = ({
  title,
  onCancel,
  onConfirm,
  isOpen,
  disabled = false
}: DeleteConfirmationModalProps) => {

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle className="flex flex-col justify-center items-center">
            {title}
          </DialogTitle>
            <DialogDescription className="text-center pt-2  space-y-2 font-medium">
              <div className="bg-background p-6 rounded-lg">

                <div className="flex justify-center items-center mt-4 ">
                  <Button onClick={onCancel} variant="outline">
                    Cancel
                  </Button>
                  <Button   
                    onClick={onConfirm} 
                    className="ml-2" variant="destructive"
                    disabled={disabled}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </DialogDescription>
        
        </DialogHeader>

      </DialogContent>
    </Dialog>






  );
}
