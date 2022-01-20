import { Formik, Field } from "formik";

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
    localAddress: [],
    city: "",
    zipcode: "",
    country: ""
  }
};

export default function ContactForm({
  initialValue = defaultValue,
  onSubmit
}: Props) {
  return (
    <Formik<Contact> initialValues={initialValue} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name" type="text" />
          <Field name="email" type="email" />
          <button type="submit">Save</button>
        </form>
      )}
    </Formik>
  );
}
