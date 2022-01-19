import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SORTING_OPTIONS } from "../../const";

type SortBy = typeof SORTING_OPTIONS[number];

const initialState: {
  sortedBy: SortBy;
  isDescending: boolean;
} = {
  sortedBy: "name",
  isDescending: false
};

const { reducer, actions } = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    sortBy(state, action: PayloadAction<SortBy>) {
      state.sortedBy = action.payload;
    },
    setDirection(state, action: PayloadAction<boolean>) {
      state.isDescending = action.payload;
    }
  }
});

export default reducer;
export const { sortBy, setDirection } = actions;
