interface Contact {
  name: string;
  username: string;
  email: string;

  phone?: string;
  website?: string;

  address: {
    localAddress: string[];
    city: string;
    state?: string;
    zipcode: string;
    country: string;
  };
}

interface ContactRecord {
  contact: Contact;
  id: string;
  isFavorite: boolean;
  modifiedTimestamp: number;
}

type ID = ContactRecord["id"];

export type { Contact, ContactRecord, ID };
