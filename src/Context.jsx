import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme === "light";

  // Foydalanuvchi hech qachon tanlamagan bo'lsa, tizim mavzusiga ergashamiz.
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: light)").matches
  );
};

export const ThemeProvider = ({ children }) => {
  const [isLight, setIsLight] = useState(getInitialTheme);

  const toggleTheme = () => setIsLight((prev) => !prev);

  useEffect(() => {
    document.body.classList.toggle("light-mode", isLight);
    document.body.classList.toggle("dark-mode", !isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }, [isLight]);

  return (
    <ThemeContext.Provider value={{ isLight, isDark: !isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
