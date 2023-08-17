import { create } from 'zustand'

interface useConfirmationModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  
}

const useConfirmationModal = create<useConfirmationModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),

}));
 
export default useConfirmationModal;