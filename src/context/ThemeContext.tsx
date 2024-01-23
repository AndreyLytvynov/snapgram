import { IThemeContextType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  isDarkTheme: true,
  setIsDarkTheme: () => true as boolean,
};

export const ThemeContext = createContext<IThemeContextType>(INITIAL_STATE);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("isDarkTheme");
    return storedTheme ? JSON.parse(storedTheme) : true;
  });

  useEffect(() => {
    localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const value = {
    isDarkTheme,
    setIsDarkTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = () => useContext(ThemeContext);
