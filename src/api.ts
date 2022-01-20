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

type RawContact = ss.Infer<typeof contactShape>;

// transform the json data into the internal representation of a contact
const transformRawContact = (raw: RawContact): ContactRecord => {
  const { streetA, streetB, streetC, streetD, ...address } = raw.address;

  const localAddress = [streetA, streetB, streetC, streetD].flatMap(
    (line) => (line ? [line] : []) // remove empty lines and let typescript know
  );

  const { favorite, id, ...contact } = {
    ...raw,
    address: {
      ...address,
      localAddress
    }
  };

  return {
    contact,
    id: id.toString(),
    isFavorite: !!favorite,
    modifiedTimestamp: Date.now()
  };
};

const fetchContacts = async (): Promise<ContactRecord[]> => {
  const rawContacts = await (await fetch(USERS_URL)).json();

  // if the users api didn't return an array, something has gone horribly wrong
  ss.assert(rawContacts, ss.array());

  return rawContacts.flatMap((rawContact) => {
    try {
      rawContact = ss.mask(rawContact, contactShape);
      ss.assert(rawContact, contactShape);

      return transformRawContact(rawContact);
    } catch (err) {
      // if a rawContact is invalid,
      // log the error and don't add anything to the output
      console.error(err);
      return [];
    }
  });
};

export { fetchContacts };
