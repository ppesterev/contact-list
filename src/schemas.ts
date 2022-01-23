import * as Y from "yup";

import { Contact } from "./types";

const apiContactSchema = Y.object({
  id: Y.number().required(),
  name: Y.string().defined().required(),
  username: Y.string().required(),
  email: Y.string().email().required(),

  address: Y.object({
    streetA: Y.string().required(),
    streetB: Y.string(),
    streetC: Y.string(),
    streetD: Y.string(),

    city: Y.string().required(),
    state: Y.string(),
    zipcode: Y.string().required(),
    country: Y.string().required()
  }),

  phone: Y.string(),
  website: Y.string().url(),

  favorite: Y.boolean()
});

const formContactSchema: Y.SchemaOf<Contact> = Y.object({
  name: Y.string().defined().required("Please fill in the name"),
  username: Y.string().required("Please provide a username"),
  email: Y.string()
    .email("Please provide a valid email address")
    .required("Please provide an email address"),

  phone: Y.string(),
  website: Y.string().url("Please provide a valid URL"),

  address: Y.object({
    localAddress: Y.array().of(Y.string().required()).min(1).max(4).required(),
    city: Y.string().required("Please provide the city name"),
    state: Y.string(),
    zipcode: Y.string().required("Please fill in the zipcode"),
    country: Y.string().required("Please specify the country")
  })
});

type APIContact = Y.InferType<typeof apiContactSchema>;

export { apiContactSchema, formContactSchema };
export type { APIContact };
