import { THEME } from "@/theme/theme";
import { ChildrenProps, CssStyles, StyleProps } from "@/utils/propTypes";
import { css } from "styled-components";

export interface InputLabelProps extends ChildrenProps, StyleProps {
  hasError?: boolean;
  errorStyles?: CssStyles;
}

export const InputLabel = ({
  children,
  styles,
  errorStyles,
  hasError,
}: InputLabelProps) => {
  return (
    <label
      css={css`
        display: block;
        transition: color 0.3s ease;
        margin-bottom: 8px;
        color: ${THEME.palette.greyDark};
        font-size: 12px;
        font-weight: 400;
        line-height: 140%;

        ${hasError && errorStyles}
        ${styles}
      `}
    >
      {children}
    </label>
  );
};
