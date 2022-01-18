import ss from "superstruct";

import { Contact } from "./types";

const USERS_URL = "https://demo.sibers.com/users";

const contactsShape = ss.array(
  ss.object({
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
    website: ss.optional(ss.string())
  })
);

const fetchContacts = (): Promise<Contact[]> => {
  return fetch(USERS_URL)
    .then((res) => res.json())
    .then((rawContacts) => {
      if (!ss.is(rawContacts, contactsShape)) {
        throw new Error("Received invalid data");
      }

      const contacts: Contact[] = rawContacts.map((rawContact) => {
        const { streetA, streetB, streetC, streetD, ...address } =
          rawContact.address;

        const localAddress = [streetA, streetB, streetC, streetD].flatMap(
          (line) => (line ? [line] : []) // remove empty lines and let typescript know
        );

        return {
          ...rawContact,
          address: {
            ...address,
            localAddress
          },

          isFavorite: false,
          modifiedTimestamp: Date.now()
        };
      });

      return contacts;
    });
};

export { fetchContacts };
