import { useAppSelector } from "../store/hooks";

export default function ContactsList() {
  const contacts = useAppSelector((state) => state.contacts);
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
