import { ReactNode } from "react";
import { RuleSet } from "styled-components";

export interface ChildrenProps {
  children?: ReactNode[] | ReactNode;
}

export interface StyleProps {
  styles?: CssStyles;
}

export type CssStyles = RuleSet<any>;

export type SvgProps = {
  color: string;
  styles?: CssStyles;
  onClick?: () => void;
} & (
  | {
      size: number;
    }
  | {
      width: number;
      height: number;
    }
);
