import ModalProvider from "@/components/provider/modal-provider";


const ChatLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="mx-auto  h-full w-full"> 
        <ModalProvider />
      {children}
    </div>
   );
}

export default ChatLayout;