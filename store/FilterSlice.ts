import { FilterState } from "@/components/FilterCheckbox";
import { createSlice } from "@reduxjs/toolkit";

export type FilterConditions = {
  searchQuery: string;
  tags: { [id: string]: FilterState };
};

const setSearchQuery = (state: FilterConditions, action: { payload: string }) => {
  state.searchQuery = action.payload;
};

const setFilter = (
  state: FilterConditions,
  action: { payload: { id: string; value: FilterState } },
) => {
  const { id, value } = action.payload;
  state.tags[id] = value;
};

const clearFilter = (state: FilterConditions) => {
  Object.keys(state.tags).forEach((id) => {
    state.tags[id] = FilterState.Ignore;
  });
  state.searchQuery = "";
};

const initialState: FilterConditions = { searchQuery: "", tags: {} };

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchQuery,
    setFilter,
    clearFilter,
  },
});
