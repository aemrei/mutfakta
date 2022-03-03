import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "./MenuSlice";
import { recipeSlice } from "./RecipeSlice";

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    recipe: recipeSlice.reducer,
  },
});
