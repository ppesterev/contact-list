import { useAppDispatch } from "../store/hooks";

import { setFavorite } from "../store/slices/contacts/contactsSlice";

import { ContactRecord, ID } from "../types";

interface Props {
  record: ContactRecord;
  onEditContact: (id: ID) => void;
}

export default function ContactCard({ record, onEditContact }: Props) {
  const dispatch = useAppDispatch();

  const {
    id,
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
      <button onClick={() => onEditContact(id)}>Edit contact</button>
      <button
        onClick={() => dispatch(setFavorite({ id, isFavorite: !isFavorite }))}
      >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </article>
  );
}
