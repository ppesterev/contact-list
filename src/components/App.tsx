import { useEffect } from "react";

import { fetchContacts } from "../api";

import { loadContacts } from "../store/contacts/contactsSlice";
import { sortBy, setDirection } from "../store/sorting/sortingSlice";

import { useAppSelector, useAppDispatch } from "../store/hooks";

import ContactsList from "./ContactsList";

import { SORTING_OPTIONS } from "../const";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchContacts().then((contacts) => {
      dispatch(loadContacts(contacts));
    });
  }, []);

  const [sortedBy, sortedDescending] = useAppSelector((state) => [
    state.sorting.sortedBy,
    state.sorting.isDescending
  ]);

  return (
    <div className="App">
      <h1>My Contacts</h1>
      <section>
        <h2>Sorting</h2>
        <select
          value={sortedBy}
          onChange={(evt) => {
            let option = SORTING_OPTIONS.find(
              (opt) => opt === evt.currentTarget.value
            );
            if (!option) {
              return;
            }
            dispatch(sortBy(option));
          }}
        >
          {SORTING_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              By {opt}
            </option>
          ))}
        </select>
        <button onClick={() => dispatch(setDirection(!sortedDescending))}>
          {sortedDescending ? "Desc." : "Asc."}
        </button>
      </section>
      <section>
        <h2>Contact list</h2>
        <ContactsList />
      </section>
    </div>
  );
}

export default App;
