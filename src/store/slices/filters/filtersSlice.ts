import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  search: string;
  onlyFavorites: boolean;
} = {
  search: "",
  onlyFavorites: false
};

const { reducer, actions } = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    setOnlyFavorites(state, action: PayloadAction<boolean>) {
      state.onlyFavorites = action.payload;
    }
  }
});

export default reducer;
export const { setSearch, setOnlyFavorites } = actions;
