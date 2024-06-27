"use client";

import { THEME, Theme } from "@/theme/theme";
import { noOp } from "@/utils/noOp";
import { CssStyles } from "@/utils/propTypes";
import { motion } from "framer-motion";
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { css } from "styled-components";

type KeyboardType = "text" | "number";

type Validate = (value: string) => string | null;

export type TextInputStyleType = "default" | "display";

export interface TextInputProps {
  onValueChange: (value: string) => void;
  disableAnimations?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  value: string;
  placeholder?: string;
  type?: "text" | "password" | "number" | "tel" | "email";
  inputStyles?: CssStyles;
  error?: string | null;
  setError?: (error: string | null) => void;
  validate?: Validate;
  clearError?: () => void;
  isDisabled?: boolean;
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => void;
  keyboardType?: KeyboardType;
  rows?: number;
  autoResize?: boolean;
  allowResize?: boolean;
  styleType?: TextInputStyleType;
  maxLength?: number;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autoComplete?: string;
  autoFocus?: boolean;
}

// This function can also be used to style text input like components (e.g. select)
export function getBaseInputStyles(
  styleType: TextInputStyleType,
  THEME: Theme,
  allowResize = false
) {
  return css`
    font-weight: ${styleType === "default" ? 500 : 800};
    padding: ${styleType === "default" ? 12 : 0}px
      ${styleType === "default" ? 14 : 24}px;
    /* min-height: 48px; */
    border-radius: 4px;
    border: "none";
    color: black;
    background: white;
    transition: color 0.4s ease;
    width: 100%;
    resize: ${allowResize ? "vertical" : "none"};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${THEME.palette.greyLight};
    }

    &:disabled {
      color: ${THEME.palette.grey};
    }
  `;
}

// eslint-disable-next-line react/display-name
export const TextInput = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  TextInputProps
>(
  (
    {
      onValueChange,
      onBlur: propsOnBlur,
      onFocus: propsOnFocus,
      onKeyDown: propsOnKeyDown,
      value,
      placeholder,
      clearError = noOp,
      type = "text",
      inputStyles,
      error,
      setError,
      isDisabled,
      keyboardType,
      autoComplete,
      validate,
      allowResize = false,
      autoFocus = false,
      maxLength,
      rows,
      styleType = "default",
      autoResize = false,
    },
    ref
  ) => {
    // --- CALLBACKS ---

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        onValueChange(event.target.value);

        if (validate) {
          const nextError = validate(event.target.value);

          if (error || nextError) setError?.(nextError);
        } else {
          if (error) clearError?.();
        }
      },
      [validate, onValueChange, error, clearError, setError]
    );

    const [, setIsFocused] = useState(false);

    const onBlur = useCallback(() => {
      propsOnBlur?.();
      setIsFocused(false);
    }, [propsOnBlur]);

    const onFocus = useCallback(() => {
      clearError();
      propsOnFocus?.();
      setIsFocused(true);
    }, [propsOnFocus, clearError]);

    // --- MEMOIZED ---

    const keyboardPattern: {
      inputMode: InputHTMLAttributes<HTMLInputElement>["inputMode"];
      pattern: string | undefined;
    } = useMemo(() => {
      switch (keyboardType) {
        case "number":
          return { pattern: "[0-9]*", inputMode: "numeric" };

        case "text":
          return { pattern: undefined, inputMode: "text" };

        default:
          return type === "number"
            ? { pattern: "[0-9]*", inputMode: "numeric" }
            : { pattern: undefined, inputMode: "text" };
      }
    }, [keyboardType, type]);

    // --- RENDER ---

    const cssStyle = useMemo(() => {
      return css`
        ${getBaseInputStyles(
          styleType,
          THEME,
          rows !== undefined && allowResize
        )};

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        &[type="number"] {
          appearance: textfield;
          -moz-appearance: textfield;
        }

        ::placeholder {
          color: #838188;
          font-size: 14px;
        }

        ${inputStyles};
      `;
    }, [styleType, rows, allowResize, inputStyles]);

    const onKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        if (propsOnKeyDown) propsOnKeyDown(event);

        if (event.key === "Enter") {
          event.stopPropagation();
        }
      },
      [propsOnKeyDown]
    );

    const baseInputProps = {
      ref,
      value,
      maxLength,
      onBlur,
      onFocus,
      autoFocus,
      onKeyDown,
      placeholder,
      autoComplete,
      disabled: isDisabled,
      onChange: handleChange,
    } as const;

    if (rows !== undefined) {
      const computedRows = autoResize
        ? Math.max(value.split("\n").length, rows)
        : rows;

      return (
        <motion.textarea
          {...baseInputProps}
          rows={computedRows}
          css={cssStyle}
        />
      );
    }

    return (
      <motion.input
        type={type}
        {...baseInputProps}
        {...keyboardPattern}
        css={cssStyle}
      />
    );
  }
);
