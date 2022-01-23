import { useEffect } from "react";

import { fetchContacts } from "../api";

import { loadContacts } from "../store/contacts/contactsSlice";

import { useAppDispatch } from "../store/hooks";

import ContactsList from "./ContactsList";
import SortForm from "./SortForm";
import FilterForm from "./FilterForm";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
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
        <ContactsList />
      </section>
    </div>
  );
}

export default App;
