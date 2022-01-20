import * as ss from "superstruct";

import { ContactRecord } from "./types";

const USERS_URL = "https://demo.sibers.com/users";

const contactShape = ss.object({
  id: ss.number(),
  name: ss.string(),
  username: ss.string(),
  email: ss.string(),
  address: ss.object({
    streetA: ss.string(),
    streetB: ss.optional(ss.string()),
    streetC: ss.optional(ss.string()),
    streetD: ss.optional(ss.string()),

    city: ss.string(),
    state: ss.optional(ss.string()),
    zipcode: ss.string(),
    country: ss.string()
  }),
  phone: ss.optional(ss.string()),
  website: ss.optional(ss.string()),
  favorite: ss.optional(ss.boolean())
});

const fetchContacts = async (): Promise<ContactRecord[]> => {
  const res = await fetch(USERS_URL);
  const rawContacts = await res.json();

  // if the users api didn't return an array, something has gone horribly wrong
  ss.assert(rawContacts, ss.array());

  const contactRecords = rawContacts.map((rawContact) => {
    try {
      rawContact = ss.mask(rawContact, contactShape);
      ss.assert(rawContact, contactShape);

      const { streetA, streetB, streetC, streetD, ...address } =
        rawContact.address;

      const localAddress = [streetA, streetB, streetC, streetD].flatMap(
        (line) => (line ? [line] : []) // remove empty lines and let typescript know
      );

      return {
        id: rawContact.id.toString(),
        contact: {
          ...rawContact,
          address: {
            ...address,
            localAddress
          }
        },

        isFavorite: !!rawContact.favorite,
        modifiedTimestamp: Date.now()
      };
    } catch (e) {
      // if any of the user json objects are invalid,
      // log the error and add undefined to contacts
      console.error(e);
    }
  });

  // filter out the undefined contacts from earlier
  return contactRecords.flatMap((c) => (c ? [c] : []));
};

export { fetchContacts };
