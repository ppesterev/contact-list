import { useAppSelector, useAppDispatch } from "../store/hooks";

import { editContact } from "../store/contacts/contactsSlice";

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

  return records ? (
    <ul>
      {records.map(({ id, contact }) => (
        <li key={id}>
          <article>
            <h3>{contact.name}</h3>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <button
              onClick={() =>
                dispatch(
                  editContact({
                    id,
                    timestamp: Date.now(),
                    contact: { ...contact, name: "censored" }
                  })
                )
              }
            >
              Censor contact
            </button>
          </article>
        </li>
      ))}
    </ul>
  ) : (
    <span>No contacts found</span>
  );
}
