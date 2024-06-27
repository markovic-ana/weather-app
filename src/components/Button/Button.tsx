"use client";

import { AnimatePresence, motion, MotionProps } from "framer-motion";
import {
  ElementType,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Link from "next/link";
import { CssStyles, StyleProps, SvgProps } from "@/utils/propTypes";
import { run } from "@/utils/run";
import { css } from "styled-components";
import { getButtonAnimations, parseButtonStyles } from "./buttonHelpers";
import { LoadingSpinner } from "../LoadingSpinner";
import { THEME } from "@/theme/theme";

export type ButtonStyleType =
  | "primary"
  | "secondary"
  | "unstyled"
  | "ghost"
  | "invisible-ghost";
export type ButtonSizeType = "xs" | "sm" | "md" | "lg";

export interface ButtonProps extends StyleProps {
  as?: ElementType;
  styleType: ButtonStyleType;
  backgroundColor?: string;
  contentColor?: string;

  SvgIconLeft?: (props: SvgProps) => ReactNode;
  SvgIconRight?: (props: SvgProps) => ReactNode;

  iconLeftStyles?: CssStyles;
  iconRightStyles?: CssStyles;
  children?: ReactNode;
  render?: (contentColor: string) => ReactNode;
  isLoading?: boolean;
  setIsLoading?: (isLoading: boolean) => void;
  isDisabled?: boolean;
  onClick?: (
    e: MouseEvent<Element, globalThis.MouseEvent>
  ) => Promise<unknown> | void;
  linkProps?: {
    href: string;
    target?: "_blank" | "_self" | undefined;
  };
  forceGhostBackground?: boolean;
  overrideAnimations?: (state: {
    isLoading?: boolean;
    isDisabled?: boolean;
  }) => Pick<
    MotionProps,
    "initial" | "animate" | "exit" | "transition" | "whileHover" | "whileTap"
  >;
  disableAnimations?: boolean;
  loadingSpinnerSize?: number;
  sizeType?: ButtonSizeType;
  wrapText?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line";
  type?: "button" | "submit" | "reset";
}

/**
 * Button component that can be used to trigger actions.
 * It can also be used as a link.
 */
export const Button = ({
  as,
  children,
  contentColor: propsContentColor,
  backgroundColor: propsBackgroundColor,
  iconLeftStyles,
  iconRightStyles,
  styleType,
  isLoading,
  setIsLoading,
  isDisabled,
  onClick: propsOnClick,
  linkProps,
  disableAnimations,
  overrideAnimations,
  styles,
  loadingSpinnerSize = 16,
  sizeType,
  SvgIconLeft,
  SvgIconRight,
  wrapText = "nowrap",
  forceGhostBackground,
  type,
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const animations = useMemo(
    () => ({
      ...getButtonAnimations(styleType, {
        disableAnimations,
        isLoading,
        isDisabled,
        forceGhostBackground,
      }),
      ...overrideAnimations?.({ isLoading, isDisabled }),
    }),
    [
      isLoading,
      isDisabled,
      styleType,
      disableAnimations,
      overrideAnimations,
      forceGhostBackground,
    ]
  );

  const size = useMemo(() => {
    switch (sizeType) {
      case "xs":
        return "14px";
      case "sm":
        return "32px";
      case "md":
        return "40px";
      case "lg":
        return "45px";
    }
  }, [sizeType]);

  const {
    backgroundStyle: computedBackgroundStyle,
    borderStyle,
    colorStyle: computedColorStyle,
  } = useMemo(() => parseButtonStyles(styleType), [styleType]);

  const colorStyle = propsContentColor ?? computedColorStyle;
  const backgroundStyle = propsBackgroundColor ?? computedBackgroundStyle;

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (isDisabled || isLoading || !propsOnClick) return;

      const promise = propsOnClick(e);

      if (promise && setIsLoading) {
        setIsLoading(true);
        promise.finally(() => setIsLoading(false));
      }
    },
    [isDisabled, isLoading, propsOnClick, setIsLoading]
  );

  const buttonNodeProps = useMemo(() => {
    const isOutsideLink =
      linkProps?.target === "_blank" && linkProps?.href.startsWith("http");

    return {
      as: isOutsideLink
        ? as ?? linkProps
          ? ("a" as const)
          : ("button" as const)
        : undefined,
      target: isOutsideLink ? linkProps?.target : undefined,
      href: isOutsideLink ? linkProps?.href : undefined,
      children,
      onClick,
      disabled: isDisabled || isLoading,
      ref: buttonRef,
      // ...animations,
    };
  }, [isDisabled, as, linkProps, isLoading, onClick, children]);

  const buttonNode = run(() => {
    return (
      <AnimatePresence initial={false}>
        <motion.button
          type={type}
          {...buttonNodeProps}
          css={css`
            will-change: transform, filter;
            display: flex;
            cursor: ${isDisabled || isLoading ? "default" : "pointer"};
            justify-content: center;
            align-items: center;
            transition-property: filter, background, color, background-color;
            transition-duration: 0.15s;
            transition-timing-function: ease-out;
            height: 54px;
            padding: 0 18px;
            background: ${isDisabled
              ? THEME.palette.overlayDark
              : backgroundStyle};
            border: ${borderStyle};
            color: ${isDisabled ? THEME.palette.overlayLight : colorStyle};
            border-radius: ${THEME.borderRadius.xl};
            font-size: 12px;
            text-transform: uppercase;
            gap: 8px;
            font-weight: 300;
            line-height: 140%;
            letter-spacing: -0.14px;
            width: ${styleType === "unstyled" ? "unset" : "fit-content"};
            -webkit-tap-highlight-color: transparent;
            height: ${size};
            font-family: "Helvetica Neue", sans-serif;

            &:focus-visible {
              outline: none;
            }

            ${styles}
          `}
        >
          <div
            css={css`
              position: relative;
              user-select: none;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            `}
          >
            {isLoading && (
              <LoadingSpinner
                height={`${loadingSpinnerSize}px`}
                width={`${loadingSpinnerSize}px`}
                color={colorStyle}
                styles={css`
                  position: absolute;
                  left: 0;
                  right: 0;
                  margin: ${SvgIconLeft || SvgIconRight ? 0 : "-1px"} auto;
                `}
              />
            )}

            <motion.span
              initial={{ opacity: isLoading ? 0 : 1 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              css={css`
                display: flex;
                align-items: center;
                min-width: fit-content;
                white-space: ${wrapText};
                justify-content: center;
                width: 100%;
                gap: 8px;
              `}
            >
              {SvgIconLeft && (
                <SvgIconLeft
                  size={sizeType === "sm" ? 12 : sizeType === "md" ? 14 : 18}
                  color={colorStyle}
                  styles={iconLeftStyles}
                />
              )}

              {children}

              {SvgIconRight && (
                <SvgIconRight
                  size={sizeType === "sm" ? 12 : sizeType === "md" ? 14 : 18}
                  color={colorStyle}
                  styles={iconRightStyles}
                />
              )}
            </motion.span>
          </div>
        </motion.button>
      </AnimatePresence>
    );
  });

  if (!linkProps) return buttonNode;

  return <Link {...linkProps}>{buttonNode}</Link>;
};
