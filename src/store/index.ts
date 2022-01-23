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

type RootState = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export default store;
export type { RootState, Dispatch };
