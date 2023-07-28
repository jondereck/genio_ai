"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";


export  const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("cece40ed-5a5b-4351-bf84-ec6952f406ab")
  }, []);

  return null;
}