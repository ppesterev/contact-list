import { useEffect } from "react";

import { fetchContacts } from "../api";
import { loadContacts } from "../store/slices/contacts/contactsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function useFetchContacts() {
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
}
