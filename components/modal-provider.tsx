'use client';

import { useEffect, useState } from "react";
import ProModal from "./pro-modal";

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