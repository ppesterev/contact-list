import { Middleware } from "@reduxjs/toolkit";

import { CONTACTS_STORAGE_KEY } from "../../const";
import { set } from "../../storage";

import { RootState } from "..";

export const syncToStorageMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);
    switch (action.type) {
      case "contacts/loadContacts":
      case "contacts/addContact":
      case "contacts/updateContact":
      case "contacts/deleteContact":
      case "contacts/setFavorite":
        set(CONTACTS_STORAGE_KEY, getState().contacts);
        break;
      default:
        break;
    }
  };
