import { configureStore } from "@reduxjs/toolkit";
import { filterSlice } from "./FilterSlice";
import { menuSlice } from "./MenuSlice";
import { recipeSlice } from "./RecipeSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    menu: menuSlice.reducer,
    recipe: recipeSlice.reducer,
  },
});
