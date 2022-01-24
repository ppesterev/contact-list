import { useContext, ReactNode, HTMLAttributes } from "react";

import { headingLevelContext } from "./HeadingRegion";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const headingElements = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

export default function ContextualHeading({ children, ...rest }: Props) {
  const level = Math.max(Math.min(useContext(headingLevelContext), 6), 1) || 1;
  const HeadingElement = headingElements[level - 1];
  return <HeadingElement {...rest}>{children}</HeadingElement>;
}
