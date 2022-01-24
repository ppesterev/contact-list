import { useEffect } from "react";

import { fetchContacts } from "../api";

import { loadContacts } from "../store/slices/contacts/contactsSlice";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import ContactsDisplay from "./ContactsDisplay";
import SortForm from "./SortForm";
import FilterForm from "./FilterForm";

function App() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts);
  useEffect(() => {
    if (contacts) {
      return;
    }

    fetchContacts().then((contacts) => {
      dispatch(loadContacts(contacts));
    });
  }, []);

  return (
    <div className="App">
      <h1>My Contacts</h1>
      <section>
        <h2>Sorting</h2>
        <SortForm />
      </section>
      <section>
        <h2>Filters</h2>
        <FilterForm />
      </section>
      <section>
        <h2>Contact list</h2>
        <ContactsDisplay />
      </section>
    </div>
  );
}

export default App;
