import { ContactRecord } from "../types";

type ID = ContactRecord["id"];

interface Props {
  record: ContactRecord;
  onEditContact: (id: ID) => void;
  onFavorite: (id: ID) => void;
}

export default function ContactCard({
  record,
  onEditContact,
  onFavorite
}: Props) {
  const {
    contact: { name, email, username, phone, website, address },
    isFavorite
  } = record;

  return (
    <article>
      <h3>
        {name} <span>({username})</span>
      </h3>
      <a href={`mailto:${email}`}>{email}</a>
      {phone && (
        <p>
          Phone: <a href={`tel:${phone}`}>{phone}</a>
        </p>
      )}
      {website && (
        <p>
          Website: <a href={website}>{website}</a>
        </p>
      )}
      <button onClick={() => onEditContact(record.id)}>Edit contact</button>
      <button onClick={() => onFavorite(record.id)}>
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </article>
  );
}
