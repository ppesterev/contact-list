import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getSorting, getContactsToDisplay } from "../store/selectors";
import {
  addContact,
  updateContact
} from "../store/slices/contacts/contactsSlice";

import ContactFormDialog from "./ContactFormDialog";
import ContactsList from "./ContactsList";
import AlphabeticGroup from "./AlphabeticGrouping";

import { Contact, ID } from "../types";

export default function ContactsDisplay() {
  const dispatch = useAppDispatch();
  const { sortedBy, isDescending } = useAppSelector(getSorting);
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
      <ContactFormDialog
        show={addingContact && editedContactId === null}
        onClose={() => setAddingContact(false)}
        onSubmit={onAddSubmitted}
      />
      <ContactFormDialog
        show={!addingContact && editedContactId !== null}
        onClose={() => setEditedContactId(null)}
        onSubmit={onEditSubmitted}
        initialValue={
          records?.find((record) => record.id === editedContactId)?.contact
        }
      />

      {records &&
        (isAlphabetical ? (
          <AlphabeticGroup
            items={records}
            alphabetization={(record) => record.contact.name}
            reverse={isDescending}
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
