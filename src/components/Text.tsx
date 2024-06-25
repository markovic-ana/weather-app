"use client";

import { ChildrenProps, StyleProps } from "@/utils/propTypes";
import { run } from "@/utils/run";
import { css } from "styled-components";

export interface TextProps extends ChildrenProps, StyleProps {
  fs?: number | "inherit";
  fw?: number | "inherit";
  color?: string;
}

/**
 * This component is used to display simple paragraphs of text.
 */

export const Text = ({ children, color, styles, fs, fw }: TextProps) => {
  return (
    <p
      css={css`
        color: black;
        transition: color 0.2s ease-in-out;

        ${run(() => {
          if (typeof fs === "number" || fs === "inherit") {
            return css`
              font-size: ${typeof fs === "number" ? fs + "px" : fs};
            `;
          }
        })}

        ${run(() => {
          if (typeof fw === "number" || fw === "inherit") {
            return css`
              font-weight: ${fw};
            `;
          }
        })}

                ${run(() => {
          if (color) {
            return css`
              color: ${color};
            `;
          }
        })}



                ${styles}
      `}
    >
      {children}
    </p>
  );
};
