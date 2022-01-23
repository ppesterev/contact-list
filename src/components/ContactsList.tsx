import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { addContact, updateContact } from "../store/contacts/contactsSlice";

import ContactForm from "./ContactForm";
import ContactCard from "./ContactCard";

import { ContactRecord } from "../types";

export default function ContactsList() {
  const dispatch = useAppDispatch();

  const records = useAppSelector((state) => {
    const { sortedBy, isDescending } = state.sorting;
    return (
      state.contacts &&
      [...state.contacts].sort((a, b) => {
        const [nameA, nameB] = [
          a.contact.name.toLowerCase(),
          b.contact.name.toLowerCase()
        ];
        let order = 0;
        switch (sortedBy) {
          case "name":
            order = nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            break;

          case "date":
            order = a.modifiedTimestamp - b.modifiedTimestamp;
        }
        return isDescending ? -order : order;
      })
    );
  });

  const [editedContactId, setEditedContactId] = useState<
    ContactRecord["id"] | null
  >(null);
  const [addingContact, setAddingContact] = useState(false);

  return (
    <>
      <button onClick={() => setAddingContact(true)}>New contact</button>
      {addingContact && (
        <ContactForm
          onSubmit={(contact) => {
            dispatch(addContact({ timestamp: Date.now(), contact }));
            setAddingContact(false);
          }}
        />
      )}
      {editedContactId !== null && (
        <ContactForm
          initialValue={
            records?.find((rec) => rec.id === editedContactId)?.contact
          }
          onSubmit={(contact) => {
            dispatch(
              updateContact({
                id: editedContactId,
                contact,
                timestamp: Date.now()
              })
            );
            setEditedContactId(null);
          }}
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
