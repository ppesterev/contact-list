import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import deepmerge from "deepmerge";

import { Contact, ContactRecord } from "../../types";

const { reducer, actions } = createSlice({
  name: "contacts",
  initialState: (): ContactRecord[] | null => null,
  reducers: {
    loadContacts(state, action: PayloadAction<ContactRecord[]>) {
      return action.payload;
    },

    addContact(
      state,
      action: PayloadAction<{ timestamp: number; contact: Contact }>
    ) {
      const { timestamp, contact } = action.payload;
      state?.push({
        id: Math.floor(Math.random() * 10 ** 6).toString(),
        modifiedTimestamp: timestamp,
        isFavorite: false,
        contact
      });
    },

    updateContact(
      state,
      action: PayloadAction<{
        id: string;
        timestamp: number;
        contact: Partial<Contact>;
      }>
    ) {
      const { id, timestamp, contact } = action.payload;
      const record = state?.find((record) => record.id === id);
      if (!record) {
        return;
      }

      record.modifiedTimestamp = timestamp;
      record.contact = deepmerge(record.contact, contact);
    },

    setFavorite(
      state,
      action: PayloadAction<{ id: string; isFavorite: boolean }>
    ) {
      const { id, isFavorite } = action.payload;
      const record = state?.find((rec) => rec.id === id);
      if (!record) {
        return;
      }

      record.isFavorite = isFavorite;
    }
  }
});

export default reducer;
export const { loadContacts, addContact, updateContact, setFavorite } = actions;
