"use client";

/**
 * Used to provide the theme to all components
 */

import { createContext, useContext } from "react";

import { ChildrenProps } from "@/utils/propTypes";
import { THEME } from "@/theme/theme";

const ThemeContext = createContext(THEME);

export const useTheme = () => useContext(ThemeContext);

export const GlobalThemeWrapper = ({ children }: ChildrenProps) => {
  return (
    <ThemeContext.Provider value={THEME}>{children}</ThemeContext.Provider>
  );
};
