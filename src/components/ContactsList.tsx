import { useAppSelector } from "../store/hooks";

export default function ContactsList() {
  const records = useAppSelector((state) => {
    const { sortedBy, isDescending } = state.sorting;
    return (
      state.contacts &&
      [...state.contacts].sort((a, b) => {
        const [nameA, nameB] = [a.contact.name, b.contact.name];
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
          </article>
        </li>
      ))}
    </ul>
  ) : (
    <span>No contacts found</span>
  );
}
