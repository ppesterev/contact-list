import { useEffect } from "react";

import { fetchContacts } from "../api";

import { loadContacts } from "../store/slices/contacts/contactsSlice";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import ContextualHeading from "./ContextualHeading";
import HeadingRegion from "./HeadingRegion";
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
      <ContextualHeading>My Contacts</ContextualHeading>
      <HeadingRegion>
        <section>
          <ContextualHeading>Sorting</ContextualHeading>
          <HeadingRegion>
            <SortForm />
          </HeadingRegion>
        </section>
        <section>
          <ContextualHeading>Filters</ContextualHeading>
          <HeadingRegion>
            <FilterForm />
          </HeadingRegion>
        </section>
        <section>
          <ContextualHeading>Contact list</ContextualHeading>
          <HeadingRegion>
            <ContactsDisplay />
          </HeadingRegion>
        </section>
      </HeadingRegion>
    </div>
  );
}

export default App;
