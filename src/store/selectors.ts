import { createSelector } from "@reduxjs/toolkit";

import { RootState } from ".";

const getContacts = (state: RootState) => state.contacts;
const getFilters = (state: RootState) => state.filters;
const getSorting = (state: RootState) => state.sorting;

const getFilteredContacts = createSelector(
  [getContacts, getFilters],
  (records, { search, onlyFavorites }) => {
    if (!records) {
      return records;
    }
    return records.filter((record) => {
      const nameMatches = record.contact.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return nameMatches && (!onlyFavorites || record.isFavorite);
    });
  }
);

const getContactsToDisplay = createSelector(
  [getFilteredContacts, getSorting],
  (records, { sortedBy, isDescending }) => {
    if (!records) {
      return records;
    }
    return records.slice().sort((a, b) => {
      const [nameA, nameB] = [
        a.contact.name.toLowerCase(),
        b.contact.name.toLowerCase()
      ];
      let order = 0;
      switch (sortedBy) {
        case "name":
          order = nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
          break;

        case "date":
          order = a.modifiedTimestamp - b.modifiedTimestamp;
      }
      return isDescending ? -order : order;
    });
  }
);

export { getContacts, getFilters, getSorting, getContactsToDisplay };
