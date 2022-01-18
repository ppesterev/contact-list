import { useState, useEffect } from "react";

import { fetchContacts } from "./api";
import { loadContacts } from "./store/contacts/contactsSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts);

  useEffect(() => {
    fetchContacts().then((contacts) => {
      dispatch(loadContacts(contacts));
    });
  }, []);

  return (
    <div className="App">
      <h1>My Contacts</h1>
      {contacts && (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>{contact.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
