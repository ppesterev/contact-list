import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Contact } from "../../types";

interface State {
  contacts: Contact[];
}

const initialState: State = { contacts: [] };

const { reducer, actions } = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    loadContacts(state, action: PayloadAction<Contact[]>) {
      state.contacts = action.payload;
    }
  }
});

export default reducer;
export const { loadContacts } = actions;
