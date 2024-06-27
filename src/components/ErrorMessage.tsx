import { THEME } from "@/theme/theme";
import { ChildrenProps, StyleProps } from "@/utils/propTypes";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { useId } from "react";
import { useMeasure } from "react-use";
import { css } from "styled-components";

interface ErrorMessageProps extends ChildrenProps, StyleProps {
  motionProps?: MotionProps;
  offset?: number;
}

/**
 * Error message that will hide and show with a nice animation.
 * Wrap AnimatePresence around this component to make the exit animation work (you may want to use mode="popLayout" on AnimatePresence)
 */
export const ErrorMessage = ({
  children,
  styles,
  offset = 16,
  motionProps,
}: ErrorMessageProps) => {
  const id = useId();

  const [contentRef, { height }] = useMeasure<HTMLDivElement>();

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: height + offset,
        }}
        exit={{ opacity: 0, height: 0 }}
        transition={{
          opacity: { duration: 0.2 },
          height: {
            duration: 0.18,
            type: "spring",
            stiffness: 250,
            damping: 17,
          },
        }}
        {...motionProps}
        css={css`
          position: relative;
          overflow: hidden;
        `}
      >
        <div
          ref={contentRef}
          css={css`
            position: absolute;
            bottom: 0;
            color: "red";
            font-weight: 500;
            line-height: 140%;

            ${styles}
          `}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
