import { createContext, useContext } from "react";

interface SidebarContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

export function useSidebarContext() {
  return useContext(SidebarContext);
}

export default SidebarContext;
