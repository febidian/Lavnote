import { useState } from "react";
import { createContext, useContext } from "react";

export const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme"));

  let root = window.document.documentElement;
  if (
    isDarkMode == "light" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: light)").matches)
  ) {
    root.classList.remove("dark");
    root.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
    // localStorage.removeItem("theme", "light");
    localStorage.setItem("theme", "dark");
  }

  const setLighttheme = () => setIsDarkMode("light");
  const setDarktheme = () => setIsDarkMode("dark");
  return (
    <ThemeContext.Provider value={{ setLighttheme, setDarktheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
