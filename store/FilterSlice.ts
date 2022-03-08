import { FilterState } from "@/components/FilterCheckbox";
import { createSlice } from "@reduxjs/toolkit";

export type FilterConditions = {
  [id: string]: FilterState;
};

const setFilter = (
  state: FilterConditions,
  action: { payload: { id: string; value: FilterState } },
) => {
  const { id, value } = action.payload;
  state[id] = value;
};

const clearFilter = (state: FilterConditions) => {
  Object.keys(state).forEach((id) => {
    state[id] = FilterState.Ignore;
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
