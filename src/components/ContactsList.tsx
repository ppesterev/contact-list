import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  addContact,
  updateContact
} from "../store/slices/contacts/contactsSlice";
import { getContactsToDisplay } from "../store/selectors";

import ContactForm from "./ContactForm";
import ContactCard from "./ContactCard";

import { Contact, ContactRecord, ID } from "../types";

export default function ContactsList() {
  const dispatch = useAppDispatch();
  const records = useAppSelector(getContactsToDisplay);

  const [editedContactId, setEditedContactId] = useState<ID | null>(null);
  const [addingContact, setAddingContact] = useState(false);

  const onAddSubmitted = (contact: Contact) => {
    dispatch(addContact({ timestamp: Date.now(), contact }));
    setAddingContact(false);
  };

  const onEditSubmitted = (contact: Contact) => {
    if (!editedContactId) {
      return;
    }

    dispatch(
      updateContact({
        id: editedContactId,
        contact,
        timestamp: Date.now()
      })
    );
    setEditedContactId(null);
  };

  return (
    <>
      <button onClick={() => setAddingContact(true)}>New contact</button>
      {addingContact && <ContactForm onSubmit={onAddSubmitted} />}
      {editedContactId !== null && (
        <ContactForm
          initialValue={
            records?.find((rec) => rec.id === editedContactId)?.contact
          }
          onSubmit={onEditSubmitted}
        />
      )}
      {records ? (
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              <ContactCard
                record={record}
                onEditContact={(id) => setEditedContactId(id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <span>No contacts found</span>
      )}
    </>
  );
}
