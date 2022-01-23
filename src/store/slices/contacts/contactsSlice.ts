import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import deepmerge from "deepmerge";
import { array } from "yup";

import { CONTACTS_STORAGE_KEY } from "../../../const";
import { contactRecordSchema } from "../../../schemas";
import * as storage from "../../../storage";

import { Contact, ContactRecord } from "../../../types";

const initializeState = (): ContactRecord[] | null => {
  try {
    const storedRecords = storage.get(CONTACTS_STORAGE_KEY);
    const records = array()
      .of(contactRecordSchema.required())
      .validateSync(storedRecords, {
        stripUnknown: true
      });

    return records || null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const { reducer, actions } = createSlice({
  name: "contacts",
  initialState: initializeState,
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
      record.contact = deepmerge(record.contact, contact, {
        arrayMerge: (_, source) => source
      });
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
