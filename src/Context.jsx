import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Body uchun class
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    } else {
    
       document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
