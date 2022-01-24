import { Formik, FieldArray } from "formik";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
      validateOnChange={false}
    >
      {({ handleSubmit, values, errors }) => (
        <form onSubmit={handleSubmit} noValidate>
          <FormField name="name" label="Name" />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <FormField name="username" type="text" label="Username" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField name="email" type="email" label="Email" />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <FormField name="phone" type="tel" label="Phone number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField name="website" type="url" label="Website" />
            </Grid>
          </Grid>

          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Address</FormLabel>
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
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <FormField name="address.city" type="text" label="City" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="address.state"
                  type="text"
                  label="State or province"
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="address.zipcode"
                  type="text"
                  label="Postal code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="address.country" type="text" label="Country" />
              </Grid>
            </Grid>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      )}
    </Formik>
  );
}
