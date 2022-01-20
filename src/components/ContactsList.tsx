import { useAppSelector } from "../store/hooks";

export default function ContactsList() {
  const contacts = useAppSelector((state) => {
    const { sortedBy, isDescending } = state.sorting;
    return (
      state.contacts &&
      [...state.contacts].sort((a, b) => {
        let order = 0;
        switch (sortedBy) {
          case "name":
            order = a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            break;

          case "date":
            order = a.modifiedTimestamp - b.modifiedTimestamp;
        }
        return isDescending ? -order : order;
      })
    );
  });

  return contacts ? (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <article>
            <h3>{contact.name}</h3>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </article>
        </li>
      ))}
    </ul>
  ) : (
    <span>No contacts found</span>
  );
}
