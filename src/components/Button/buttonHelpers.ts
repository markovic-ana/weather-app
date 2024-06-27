import { run } from "@/utils/run";
import { MotionProps } from "framer-motion";
import { ButtonProps, ButtonStyleType } from "./Button";
import { THEME } from "@/theme/theme";

// --- STYLE TYPE SPECIFIC STYLES ---

export function parseButtonStyles(styleType: ButtonStyleType) {
  const borderStyle = run(() => {
    switch (styleType) {
      case "secondary":
        return `1px solid ${THEME.palette.black}`;

      default:
        return "none";
    }
  });

  const backgroundStyle = run(() => {
    switch (styleType) {
      case "primary":
        return THEME.palette.black;

      case "secondary":
        return THEME.palette.accent;

      case "ghost":
        return THEME.palette.overlayDark;

      case "invisible-ghost":
        return "rgba(0, 0, 0, 0)";

      default:
        return;
    }
  });

  const colorStyle = run(() => {
    switch (styleType) {
      case "primary":
        return "white";

      default:
        return "black";
    }
  });

  return { borderStyle, backgroundStyle, colorStyle };
}

// --- ANIMATIONS ---

interface GetButtonAnimationParams
  extends Pick<
    ButtonProps,
    "isDisabled" | "isLoading" | "disableAnimations" | "forceGhostBackground"
  > {
  isMobile?: boolean;
}

export function getButtonAnimations(
  styleType: ButtonStyleType,
  {
    disableAnimations,
    isDisabled,
    isLoading,
    forceGhostBackground,
  }: GetButtonAnimationParams
):
  | undefined
  | Pick<
      MotionProps,
      "initial" | "animate" | "exit" | "transition" | "whileHover" | "whileTap"
    > {
  if (disableAnimations) return undefined;

  switch (styleType) {
    case "ghost":
      return {
        initial: {
          filter: "brightness(1)",
          scale: 1,
          opacity: isDisabled ? 0.3 : 1,
        },
        animate: {
          filter: "brightness(1)",
          scale: 1,
          opacity: isDisabled ? 0.3 : 1,
        },
        transition: { duration: 0.08, ease: "easeOut" },
        ...(!isDisabled &&
          !isLoading && {
            whileHover: {
              filter: "brightness(0.9)",
            },
            whileTap: {
              transition: { scale: { duration: 0.04 } },
              filter: "brightness(0.86)",
              scale: 0.98,
            },
          }),
      };

    case "invisible-ghost":
      return {
        initial: {
          scale: 1,
          opacity: isDisabled ? 0.5 : 1,
          backgroundColor: forceGhostBackground
            ? "rgba(0, 0, 0, 0.08)"
            : "rgba(0, 0, 0, 0)",
        },
        animate: {
          scale: 1,
          opacity: isDisabled ? 0.5 : 1,
          backgroundColor: forceGhostBackground
            ? "rgba(0, 0, 0, 0.08)"
            : "rgba(0, 0, 0, 0)",
        },
        transition: { duration: 0.08, ease: "easeOut" },
        ...(!isDisabled &&
          !isLoading && {
            whileHover: {
              backgroundColor: "rgba(0, 0, 0, 0.08)",
            },
            whileTap: {
              transition: { scale: { duration: 0.04 } },
              scale: 0.98,
            },
          }),
      };

    case "primary":
      return {
        initial: {
          scale: 1,
          opacity: 1,
          filter: "brightness(1)",
        },
        animate: {
          scale: 1,
          opacity: 1,
          filter: "brightness(1)",
        },
        ...(!isDisabled && {
          whileHover: {
            opacity: 0.9,
            scale: 1,
            filter: "brightness(0.9)",
            transition: { duration: 0.04, ease: "linear" },
          },
          whileTap: {
            opacity: 1,
            scale: 0.98,
            filter: "brightness(0.93)",
            transition: { duration: 0.04 },
          },
        }),
      };

    case "secondary":
      return {
        initial: {
          filter: "brightness(1)",
          scale: 1,
          opacity: 1,
        },
        animate: {
          filter: "brightness(1)",
          scale: 1,
          opacity: 1,
        },
        ...(!isDisabled && {
          whileHover: {
            filter: "brightness(0.96)",
            transition: { duration: 0.09, ease: "linear" },
          },
          whileTap: {
            filter: "brightness(0.93)",
            scale: 0.98,
            transition: { duration: 0.05 },
          },
        }),
      };
  }
}
