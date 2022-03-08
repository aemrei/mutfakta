import { FilterState } from "@/components/FilterCheckbox";
import { FilterConditions } from "store/FilterSlice";

export function getFilteredRecipes(recipes: Recipe[], filter: FilterConditions) {
  const { searchQuery, tags } = filter;
  const searchRegex = new RegExp(searchQuery, "i");
  const filteredRecipes = recipes.filter((recipe) => {
    if (!searchQuery) {
      return true;
    }
    const { title, description, ingredients, instructions } = recipe;
    const concatenated = [title, description, ingredients, instructions].flat().join(" ");
    return concatenated.match(searchRegex);
  });
  return filteredRecipes.filter((recipe) => {
    return Object.entries(tags).every((entry) => {
      const [key, value] = entry;
      if (value === FilterState.Ignore) {
        return true;
      }
      if (value === FilterState.Include) {
        return recipe.tags.includes(key);
      }
      return !recipe.tags.includes(key);
    });
  });
}
