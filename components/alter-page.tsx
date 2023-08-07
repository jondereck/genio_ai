'use client';


import Heading from "@/components/Heading";
import { useTheme } from "next-themes";
import NavbarAlter from "@/components/navbar-alter";
import { useEffect, useState } from "react";


const AlterEgoPage = () => {


  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState
  (theme === "dark" || theme === "system");

  useEffect(() => {
    setIsDarkMode(theme === "dark" || theme === "system")
  }, [theme])

  
  
  return (
    <div>
      <NavbarAlter/>
    </div>
  );
}

export default AlterEgoPage;