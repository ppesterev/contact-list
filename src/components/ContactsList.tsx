import ContactCard from "./ContactCard";

import { ContactRecord, ID } from "../types";

import { makeStyles } from "@material-ui/core/styles";

interface Props {
  records: ContactRecord[];
  onEditContact: (id: ID) => void;
}

const useStyles = makeStyles((theme) => ({
  contactList: {
    margin: 0,
    padding: `0 0 0 ${theme.spacing(2)}px`,
    listStyle: "none"
  },
  contactItem: {
    marginBottom: theme.spacing(3)
  }
}));

export default function ContactsList({ records, onEditContact }: Props) {
  const classes = useStyles();

  return (
    <ul className={classes.contactList}>
      {records.map((record) => (
        <li key={record.id} className={classes.contactItem}>
          <ContactCard record={record} onEditContact={onEditContact} />
        </li>
      ))}
    </ul>
  );
}
