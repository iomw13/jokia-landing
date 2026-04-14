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
 const [theme, setTheme] = useState<Theme>(() => {
   if (typeof window === "undefined") return "light";
   const saved = localStorage.getItem("theme") as Theme | null;
   return saved || "light";
 });
 
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
 
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
 
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
