import { configureStore, combineReducers } from "@reduxjs/toolkit";

import contactsReducer from "./contacts/contactsSlice";
import sortingReducer from "./sorting/sortingSlice";
import filtersReducer from "./filters/filtersSlice";

import { syncToStorageMiddleware } from "./middleware/sync-to-storage";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  sorting: sortingReducer,
  filters: filtersReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMW) => [...getDefaultMW(), syncToStorageMiddleware]
});

type RootState = ReturnType<typeof rootReducer>;
type Dispatch = typeof store.dispatch;

export default store;
export type { RootState, Dispatch };
