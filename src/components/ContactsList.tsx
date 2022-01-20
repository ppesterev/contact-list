import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../store/hooks";

import { editContact } from "../store/contacts/contactsSlice";

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

  const [editedName, setEditedName] = useState("");

  return (
    <>
      {editedContactId !== null && (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            dispatch(
              editContact({
                id: editedContactId,
                timestamp: Date.now(),
                contact: { name: editedName }
              })
            );
            setEditedContactId("");
          }}
        >
          <input
            type="text"
            name="name"
            value={editedName}
            onChange={(evt) => setEditedName(evt.currentTarget.value)}
          />
          <button type="submit">Save</button>
        </form>
      )}
      {records ? (
        <ul>
          {records.map(({ id, contact }) => (
            <li key={id}>
              <article>
                <h3>{contact.name}</h3>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <button
                  onClick={() => {
                    setEditedName(contact.name);
                    setEditedContactId(id);
                  }}
                >
                  Edit contact
                </button>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <span>No contacts found</span>
      )}
    </>
  );
}
