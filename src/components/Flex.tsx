import { ChildrenProps, StyleProps } from "@/utils/propTypes";
import { run } from "@/utils/run";
import { MotionProps, motion } from "framer-motion";
import { useMemo } from "react";
import { css } from "styled-components";

/**
 * Flexbox component
 */

interface FlexProps extends ChildrenProps, StyleProps {
  dir?: "row" | "column" | "col";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  flex?: number;
  basis?: string;
  align?: "center" | "start" | "end";
  justify?:
    | "center"
    | "start"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  motionProps?: MotionProps;
  childMarginRight?: string | number;
  childMarginBottom?: string | number;
  gap?: number;
  ref?: any;
  onClick?: () => void;
  onMouseUp?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * This component is a simple implementation of a flexbox.
 */
export const Flex = ({
  dir = "row",
  children,
  styles,
  align,
  wrap,
  justify,
  motionProps,
  flex,
  basis,
  childMarginBottom,
  childMarginRight,
  gap,
  ref,
  onClick,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
}: FlexProps) => {
  const defaultProps = useMemo(() => {
    return {
      onClick,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
    };
  }, [onClick, onMouseUp, onMouseEnter, onMouseLeave]);

  const defaultStyles = css`
    display: flex;
    flex-direction: ${dir === "col" ? "column" : dir};

    ${run(() => {
      if (align) {
        return css`
          align-items: ${align};
        `;
      }
    })}

    ${run(() => {
      if (justify) {
        return css`
          justify-content: ${justify};
        `;
      }
    })}

        ${run(() => {
      if (wrap) {
        return css`
          flex-wrap: ${wrap};
        `;
      }
    })}

        ${run(() => {
      if (typeof flex === "number") {
        return css`
          flex: ${flex};
        `;
      }
    })}

        ${run(() => {
      if (basis) {
        return css`
          flex-basis: ${basis};
        `;
      }
    })}

        ${run(() => {
      if (childMarginBottom) {
        return css`
          & > *:not(:last-child) {
            margin-bottom: ${typeof childMarginBottom === "number"
              ? `${childMarginBottom}px`
              : childMarginBottom};
          }
        `;
      }
    })}

        ${run(() => {
      if (childMarginRight) {
        return css`
          & > *:not(:last-child) {
            margin-right: ${typeof childMarginRight === "number"
              ? `${childMarginRight}px`
              : childMarginRight};
          }
        `;
      }
    })}

        ${run(() => {
      if (gap) {
        return css`
          gap: ${`${gap}px`};
        `;
      }
    })}

        cursor: ${onClick ? "pointer" : "default"};
    -webkit-tap-highlight-color: transparent;

    :focus {
      outline: none;
    }

    ${styles}
  `;

  if (!motionProps) {
    return (
      <div {...defaultProps} css={defaultStyles}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      {...defaultProps}
      {...motionProps}
      css={defaultStyles}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};
