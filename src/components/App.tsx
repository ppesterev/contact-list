import { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import Add from "@material-ui/icons/Add";

import { useAppDispatch } from "../store/hooks";
import { addContact } from "../store/slices/contacts/contactsSlice";

import useFetchContacts from "../hooks/use-fetch-contacts";

import ContextualHeading from "./ContextualHeading";
import HeadingRegion from "./HeadingRegion";
import ContactsDisplay from "./ContactsDisplay";
import SortForm from "./SortForm";
import FilterForm from "./FilterForm";
import ContactFormDialog from "./ContactFormDialog";

import { Contact } from "../types";

function App() {
  useFetchContacts();
  const dispatch = useAppDispatch();

  const [addingContact, setAddingContact] = useState(false);
  const onAddSubmitted = (contact: Contact) => {
    dispatch(addContact({ timestamp: Date.now(), contact }));
    setAddingContact(false);
  };

  return (
    <Container maxWidth="md">
      <ContactFormDialog
        show={addingContact}
        onClose={() => setAddingContact(false)}
        onSubmit={onAddSubmitted}
      />
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h5" component={ContextualHeading} gutterBottom>
            My Contacts
          </Typography>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setAddingContact(true)}
          >
            <Add />
            Add contact
          </Fab>
        </Grid>
      </Grid>
      <HeadingRegion>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3} component="section">
            <Typography variant="button" component={ContextualHeading}>
              Filter
            </Typography>
            <HeadingRegion>
              <FilterForm />
            </HeadingRegion>
          </Grid>
          <Grid item xs={12} sm={8} md={9} container spacing={2}>
            <Grid item xs={12} component="section">
              <Typography variant="button" component={ContextualHeading}>
                Sort
              </Typography>
              <HeadingRegion>
                <SortForm />
              </HeadingRegion>
            </Grid>

            <Grid item xs={12} component="section">
              <Typography variant="button" component={ContextualHeading}>
                Contact list
              </Typography>
              <HeadingRegion>
                <ContactsDisplay />
              </HeadingRegion>
            </Grid>
          </Grid>
        </Grid>
      </HeadingRegion>
    </Container>
  );
}

export default App;
