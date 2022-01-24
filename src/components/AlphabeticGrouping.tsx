import { useMemo, ReactNode, Fragment } from "react";

import ContextualHeading from "./ContextualHeading";
import HeadingRegion from "./HeadingRegion";

interface Props<T> {
  items: T[];
  alphabetization: (item: T) => string;
  reverse?: boolean;
  children: (groupItems: T[]) => ReactNode;
}

interface Group<T> {
  initial: string | null;
  items: T[];
}

export default function AlphabeticGrouping<T>({
  items,
  alphabetization,
  reverse = false,
  children
}: Props<T>) {
  const groups: Group<T>[] = useMemo(() => {
    const groups: Group<T>[] = [];

    const alphabetizedItems = items.slice().sort((a, b) => {
      const [stringA, stringB] = [a, b].map((item) =>
        alphabetization(item).toLowerCase()
      );
      const order = stringA < stringB ? -1 : stringA > stringB ? 1 : 0;
      return reverse ? -order : order;
    });

    for (const item of alphabetizedItems) {
      const itemInitial = alphabetization(item)[0].toUpperCase() || null;
      let group: Group<T> = groups[groups.length - 1];

      if (!group || group.initial !== itemInitial) {
        // start new group
        group = { initial: itemInitial?.toUpperCase() || null, items: [item] };
        groups.push(group);
      } else {
        // add to existing group
        group.items.push(item);
      }
    }

    return groups;
  }, [items, alphabetization]);

  return (
    <>
      {groups.map((group) => (
        <Fragment key={group.initial}>
          <ContextualHeading>{group.initial}</ContextualHeading>
          <HeadingRegion>{children(group.items)}</HeadingRegion>
        </Fragment>
      ))}
    </>
  );
}
