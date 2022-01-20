import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ContactRecord } from "../../types";

const { reducer, actions } = createSlice({
  name: "contacts",
  initialState: (): ContactRecord[] | null => null,
  reducers: {
    loadContacts(state, action: PayloadAction<ContactRecord[]>) {
      return action.payload;
    }
  }
});

export default reducer;
export const { loadContacts } = actions;
