import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  recipeList: [] as Recipe[],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipeList: (state, action) => {
      state.recipeList = action.payload;
    },
  },
});
