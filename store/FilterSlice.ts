import { FilterState } from "@/components/FilterCheckbox";
import { createSlice } from "@reduxjs/toolkit";

export type FilterConditions = {
  [key: string]: FilterState;
};

const setFilter = (
  state: FilterConditions,
  action: { payload: { key: string; value: FilterState } },
) => {
  const { key, value } = action.payload;
  state[key] = value;
};

const clearFilter = (state: FilterConditions) => {
  Object.keys(state).forEach((key) => {
    state[key] = FilterState.Ignore;
  });
};

const initialState: FilterConditions = {};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter,
    clearFilter,
  },
});
