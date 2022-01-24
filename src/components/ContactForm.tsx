import { Formik, Field, FieldArray } from "formik";
import { Columns } from "react-bulma-components";

import { formContactSchema } from "../schemas";

import FormField from "./FormField";
import AddressField from "./AddressField";

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
          <Columns>
            <Columns.Column>
              <FormField name="username" type="text" label="Username" />
            </Columns.Column>
            <Columns.Column>
              <FormField name="email" type="email" label="Email" />
            </Columns.Column>
          </Columns>
          <Columns>
            <Columns.Column>
              <FormField name="phone" type="tel" label="Phone number" />
            </Columns.Column>
            <Columns.Column>
              <FormField
                name="website"
                type="url"
                formNoValidate
                label="Website"
              />
            </Columns.Column>
          </Columns>

          <fieldset>
            <legend>Address</legend>
            <FieldArray name="address.localAddress">
              {({ remove, insert }) =>
                values.address.localAddress.map((_, idx) => (
                  <AddressField
                    key={idx}
                    name={`address.localAddress[${idx}]`}
                    onAddLine={() =>
                      values.address.localAddress.length < 4 &&
                      insert(idx + 1, "")
                    }
                    onRemoveLine={() =>
                      values.address.localAddress.length > 1 && remove(idx)
                    }
                  />
                ))
              }
            </FieldArray>
            <Columns>
              <Columns.Column>
                <FormField name="address.city" type="text" label="City" />
              </Columns.Column>
              <Columns.Column>
                <FormField
                  name="address.state"
                  type="text"
                  label="State or province"
                />
              </Columns.Column>
            </Columns>
            <Columns>
              <Columns.Column>
                <FormField
                  name="address.zipcode"
                  type="text"
                  label="Postal code"
                />
              </Columns.Column>
              <Columns.Column>
                <FormField name="address.country" type="text" label="Country" />
              </Columns.Column>
            </Columns>
          </fieldset>
          <button type="submit">Save</button>
        </form>
      )}
    </Formik>
  );
}
