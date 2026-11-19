import { createContext } from "react";

export const ThemeContext = createContext({
  isLight: false,
  isDark: true,
  toggleTheme: () => {},
});
