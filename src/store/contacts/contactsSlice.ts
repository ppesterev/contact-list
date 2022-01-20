import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Contact, ContactRecord } from "../../types";

const { reducer, actions } = createSlice({
  name: "contacts",
  initialState: (): ContactRecord[] | null => null,
  reducers: {
    loadContacts(state, action: PayloadAction<ContactRecord[]>) {
      return action.payload;
    },

    editContact(
      state,
      action: PayloadAction<{ id: string; timestamp: number; contact: Contact }>
    ) {
      const { id, timestamp, contact } = action.payload;
      const record = state?.find((record) => record.id === id);
      if (!record) {
        return;
      }

      record.modifiedTimestamp = timestamp;
      record.contact = contact;
    }
  }
});

export default reducer;
export const { loadContacts, editContact } = actions;
