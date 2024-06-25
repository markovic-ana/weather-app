import { StyleProps } from "@/utils/propTypes";
import { useMemo } from "react";
import { css, keyframes } from "styled-components";

interface LoadingSpinnerProps extends StyleProps {
  color?: string;
  width?: string | number;
  height?: string | number;
  size?: string | number;
}

/**
 * A loading spinner that can be used to indicate that something is loading.
 */
export const LoadingSpinner = ({
  styles,
  color,
  width,
  height,
  size,
}: LoadingSpinnerProps) => {
  const [parsedHeight, parsedWidth] = useMemo(() => {
    if (typeof size !== "undefined") {
      if (typeof size === "number") {
        return [`${size}px`, `${size}px`];
      }

      return [size, size];
    }

    const heightStr = typeof height === "number" ? `${height}px` : height;
    const widthStr = typeof width === "number" ? `${width}px` : width;

    return [heightStr, widthStr];
  }, [height, width, size]);

  return (
    <span
      css={css`
        animation-name: ${rotationKeyframes};
        animation-duration: 0.65s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        height: ${parsedHeight};
        width: ${parsedWidth};
        display: block;

        ${styles}
      `}
    >
      <span
        css={css`
          ${appearAnimation}
        `}
      >
        <svg
          strokeDasharray={150}
          strokeWidth="4px"
          strokeDashoffset={0}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="32"
            stroke={color || "white"}
            fill="transparent"
          />
        </svg>
      </span>
    </span>
  );
};

export const rotationKeyframes = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const appearKeyframes = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

export const appearAnimation = css`
  animation-name: ${appearKeyframes};
  animation-duration: 0.3s;
  animation-timing-function: ease-ease-in-out;
  animation-fill-mode: forwards;
`;
