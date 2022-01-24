import { useMemo, ReactNode, Fragment } from "react";

import Typography from "@material-ui/core/Typography";

import ContextualHeading from "./ContextualHeading";
import HeadingRegion from "./HeadingRegion";

import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme) => ({
  groupTitle: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  }
}));

export default function AlphabeticGrouping<T>({
  items,
  alphabetization,
  reverse = false,
  children
}: Props<T>) {
  const classes = useStyles();

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
          <Typography
            variant="h6"
            component={ContextualHeading}
            className={classes.groupTitle}
          >
            {group.initial}
          </Typography>
          <HeadingRegion>{children(group.items)}</HeadingRegion>
        </Fragment>
      ))}
    </>
  );
}
