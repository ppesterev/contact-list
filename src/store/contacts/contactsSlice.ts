import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Contact } from "../../types";

const { reducer, actions } = createSlice({
  name: "contacts",
  initialState: (): Contact[] | null => null,
  reducers: {
    loadContacts(state, action: PayloadAction<Contact[]>) {
      return action.payload;
    }
  }
});

export default reducer;
export const { loadContacts } = actions;
