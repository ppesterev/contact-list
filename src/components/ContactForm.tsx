import { Formik, Field, FieldArray } from "formik";

import { formContactSchema } from "../schemas";

import FormField from "./FormField";

import { Contact } from "../types";

interface Props {
  initialValue?: Contact;
  onSubmit: (contact: Contact) => void;
}

const defaultValue: Contact = {
  name: "",
  email: "",
  username: "",
  address: {
    localAddress: [""],
    city: "",
    state: "",
    zipcode: "",
    country: ""
  },
  phone: "",
  website: ""
};

export default function ContactForm({
  initialValue = defaultValue,
  onSubmit
}: Props) {
  return (
    <Formik<Contact>
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={formContactSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <FormField name="name" label="Name" />
          <FormField name="username" type="text" label="Username" />
          <FormField name="email" type="email" label="Email" />
          <FormField name="phone" type="text" label="Phone number" />
          <FormField name="website" type="text" label="Website" />

          <fieldset>
            <legend>Address</legend>
            <FieldArray name="address.localAddress">
              {({ push, pop, remove }) => (
                <div>
                  {values.address.localAddress.map((_, idx) => (
                    <div key={idx}>
                      <Field
                        name={`address.localAddress[${idx}]`}
                        type="text"
                      />
                      <button type="button" onClick={() => remove(idx)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push("")}>
                    More
                  </button>
                  <button type="button" onClick={() => pop()}>
                    Less
                  </button>
                </div>
              )}
            </FieldArray>
            City: <Field name="address.city" type="text" />
            State: <Field name="address.state" type="text" />
            Postal code: <Field name="address.zipcode" type="text" />
            Country: <Field name="address.country" type="text" />
          </fieldset>
          <button type="submit">Save</button>

          <p>{JSON.stringify(errors)}</p>
        </form>
      )}
    </Formik>
  );
}
