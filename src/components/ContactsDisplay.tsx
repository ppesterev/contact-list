import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getSorting, getContactsToDisplay } from "../store/selectors";
import { updateContact } from "../store/slices/contacts/contactsSlice";

import ContactFormDialog from "./ContactFormDialog";
import ContactsList from "./ContactsList";
import AlphabeticGroup from "./AlphabeticGrouping";

import { Contact, ID } from "../types";

export default function ContactsDisplay() {
  const dispatch = useAppDispatch();
  const { sortedBy, isDescending } = useAppSelector(getSorting);
  const records = useAppSelector(getContactsToDisplay);

  const [editedContactId, setEditedContactId] = useState<ID | null>(null);

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
      <ContactFormDialog
        show={editedContactId !== null}
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
