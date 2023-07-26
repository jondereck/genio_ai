'use client';

import { useEffect, useState } from "react";
import ProModal from "./ui/pro-modal";

const ModalProvider = () => {

  const [isMounted, setIsMouted ] = useState(false);

  useEffect(() => {
    setIsMouted(true);
    
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <>
    <ProModal/>
    </>
   );
}
 
export  default ModalProvider;