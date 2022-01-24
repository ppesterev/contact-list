import { useContext, ReactNode } from "react";

import { headingLevelContext } from "./HeadingRegion";

interface Props {
  children: ReactNode;
}

const headingElements = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

export default function ContextualHeading({ children }: Props) {
  const level = Math.max(Math.min(useContext(headingLevelContext), 1), 6) || 1;
  const HeadingElement = headingElements[level - 1];
  return <HeadingElement>{children}</HeadingElement>;
}
