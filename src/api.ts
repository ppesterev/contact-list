import * as Y from "yup";
import { apiContactSchema, APIContact as RawContact } from "./schemas";

import { ContactRecord } from "./types";

const USERS_URL = "https://demo.sibers.com/users";

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
    id,
    isFavorite: favorite,
    modifiedTimestamp: Date.now()
  };
};

const fetchContacts = async (): Promise<ContactRecord[]> => {
  const rawContacts = await (await fetch(USERS_URL)).json();

  // if the users api didn't return an array, something has gone horribly wrong
  let contactList = await Y.array().required().validate(rawContacts);

  return contactList.flatMap((rawContact) => {
    try {
      let validatedContact = apiContactSchema.validateSync(rawContact, {
        stripUnknown: true
      });
      return transformRawContact(validatedContact);
    } catch (err) {
      // if a rawContact is invalid,
      // log the error and don't add anything to the output
      console.error(err);
      return [];
    }
  });
};

export { fetchContacts };
