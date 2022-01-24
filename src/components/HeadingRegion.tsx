import { ReactNode, useContext, createContext } from "react";

interface Props {
  children: ReactNode;
}

const headingLevelContext = createContext(1);

export default function HeadingRegion({ children }: Props) {
  const headingLevel = useContext(headingLevelContext) || 1;
  return (
    <headingLevelContext.Provider value={headingLevel + 1}>
      {children}
    </headingLevelContext.Provider>
  );
}

export { headingLevelContext };
