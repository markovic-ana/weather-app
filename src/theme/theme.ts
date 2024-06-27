"use client";

const PALETTE = {
  primary: "#FF6C44",
  secondary: "#FFD633",
  white: "#FFFFFF",
  black: "#000000",
  grey: "#F4F4F4",
  greyDark: "#E0E0E0",
  greyLight: "#F9F9F9",
  disabled: "#E0E0E0",
  transparent: "transparent",
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.1)",
  overlayDark: "rgba(0, 0, 0, 0.9)",
  accent: "#9e9c9c6e",
};

const FONT_SIZE = {
  xs: "8px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
};

const BREAKPOINTS = {
  xs: 375,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1400,
};

const Z_INDEX = {
  default: 0,
  dropdown: 100,
  navigation: 200,
  modal: 300,
  loading: 500,
};

const SHADOWS = {
  sm: "0px 2px 4px rgba(0, 0, 0, 0.05)",
  md: "0px 4px 8px rgba(0, 0, 0, 0.05)",
  lg: "0px 8px 16px rgba(0, 0, 0, 0.05)",
  xl: "0px 16px 32px rgba(0, 0, 0, 0.05)",
};

const BORDER_RADIUS = {
  sm: "4px",
  md: "5px",
  lg: "10px",
  xl: "160px",
};

export const THEME = {
  palette: PALETTE,
  breakpoints: BREAKPOINTS,
  zIndex: Z_INDEX,
  shadows: SHADOWS,
  fontSize: FONT_SIZE,
  borderRadius: BORDER_RADIUS,
};

export type Theme = typeof THEME;
