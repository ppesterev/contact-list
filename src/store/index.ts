import { configureStore } from "@reduxjs/toolkit";

import contactsReducer from "./contacts/contactsSlice";
import sortingReducer from "./sorting/sortingSlice";
import filtersReducer from "./filters/filtersSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    sorting: sortingReducer,
    filters: filtersReducer
  }
});

export default store;
