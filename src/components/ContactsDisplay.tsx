import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  addContact,
  updateContact
} from "../store/slices/contacts/contactsSlice";
import { getSorting, getContactsToDisplay } from "../store/selectors";

import ContactForm from "./ContactForm";
import ContactsList from "./ContactsList";
import AlphabeticGroup from "./AlphabeticGrouping";

import { Contact, ID } from "../types";

export default function ContactsDisplay() {
  const dispatch = useAppDispatch();
  const { sortedBy } = useAppSelector(getSorting);
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

  const isAlphabetical = sortedBy === "name";

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
      {records &&
        (isAlphabetical ? (
          <AlphabeticGroup
            items={records}
            alphabetization={(record) => record.contact.name}
          >
            {(records) => (
              <ContactsList
                records={records}
                onEditContact={(id) => setEditedContactId(id)}
              />
            )}
          </AlphabeticGroup>
        ) : (
          <ContactsList
            records={records}
            onEditContact={(id) => setEditedContactId(id)}
          />
        ))}
    </>
  );
}
