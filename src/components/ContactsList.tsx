import ContactCard from "./ContactCard";

import { ContactRecord, ID } from "../types";

interface Props {
  records: ContactRecord[];
  onEditContact: (id: ID) => void;
}

export default function ContactsList({ records, onEditContact }: Props) {
  return (
    <ul>
      {records.map((record) => (
        <li key={record.id}>
          <ContactCard record={record} onEditContact={onEditContact} />
        </li>
      ))}
    </ul>
  );
}
