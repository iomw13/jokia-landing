 "use client";
 
 import {
   createContext,
   useContext,
   useEffect,
   useState,
   type ReactNode,
 } from "react";
 
 type Theme = "dark" | "light";
 
 interface ThemeContextType {
   theme: Theme;
   toggleTheme: () => void;
 }
 
 const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
 
 export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
   const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("theme") as Theme | null) || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
 
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
 
   if (!mounted) return null;
 
   return (
     <ThemeContext.Provider value={{ theme, toggleTheme }}>
       {children}
     </ThemeContext.Provider>
   );
 }
 
 export const useTheme = () => {
   const context = useContext(ThemeContext);
   if (!context) throw new Error("useTheme must be used within ThemeProvider");
   return context;
 };
