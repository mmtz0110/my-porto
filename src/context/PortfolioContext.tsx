import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, ThemeMode } from "../types";

interface PortfolioContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>("id");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    // Sync theme class to document
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <PortfolioContext.Provider
      value={{
        lang,
        setLang,
        theme,
        setTheme,
        toggleTheme,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
