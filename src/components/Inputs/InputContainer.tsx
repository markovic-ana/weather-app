"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChildrenProps, CssStyles } from "@/utils/propTypes";
import { css } from "styled-components";
import { InputLabel } from "./InputLabel";

export interface InputContainerProps extends ChildrenProps {
  label?: string;
  containerStyles?: CssStyles;
  labelStyles?: CssStyles;
  labelErrorStyles?: CssStyles;
  inputContainerStyles?: CssStyles;
  errorMessageStyles?: CssStyles;
  isFocused?: boolean;
  error?: string | null;
}

export const InputContainer = ({
  label,
  containerStyles,
  labelStyles,
  labelErrorStyles,
  inputContainerStyles,
  errorMessageStyles,
  error,
  children,
}: InputContainerProps) => {
  return (
    <motion.div
      css={css`
        display: flex;
        flex-direction: column;

        ${containerStyles}
      `}
    >
      <div
        css={css`
          ${inputContainerStyles}
        `}
      >
        {label && (
          <InputLabel
            errorStyles={labelErrorStyles}
            hasError={Boolean(error)}
            styles={labelStyles}
          >
            {label}
          </InputLabel>
        )}

        {children}
      </div>

      <AnimatePresence initial={false}></AnimatePresence>
    </motion.div>
  );
};
