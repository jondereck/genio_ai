"use client";

import { createContext, useContext, useState } from "react";

const UseClientContext = createContext();

export function UseClientProvider({ children }) {
  const [useClientOpen, setUseClientOpen] = useState(true);

  return (
    <UseClientContext.Provider value={{ useClientOpen, setUseClientOpen }}>
      {children}
    </UseClientContext.Provider>
  );
}

export function useClientContext() {
  return useContext(UseClientContext);
}
