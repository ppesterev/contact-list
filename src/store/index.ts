import { configureStore } from "@reduxjs/toolkit";

import contactsReducer from "./contacts/contactsSlice";
import sortingReducer from "./sorting/sortingSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    sorting: sortingReducer
  }
});

export default store;
