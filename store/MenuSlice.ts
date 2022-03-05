import { ToDoState } from "@/components/ToDoCheckbox";
import { createSlice } from "@reduxjs/toolkit";

export type MenuItem = {
  id: string;
  title: string;
  image: string;
  ingredientsCompletions: ToDoState[];
  instructionsCompletions: ToDoState[];
};

const initialState = {
  items: [] as MenuItem[],
};

type MenuState = typeof initialState;
type AddMenuAction = {
  payload: Recipe;
};

const addMenuItem = (state: MenuState, action: AddMenuAction) => {
  const { ingredients, instructions, id, image, title } = action.payload;
  const ingredientsCompletions = ingredients.map(() => ToDoState.NotStarted);
  const instructionsCompletions = instructions.map(() => ToDoState.NotStarted);
  if (state.items.find((item) => item.id === id)) {
    return state;
  }
  state.items.push({
    id,
    title,
    image,
    ingredientsCompletions,
    instructionsCompletions,
  });
};

type RemoveMenuAction = {
  payload: string;
};

const removeMenuItem: (state: MenuState, action: RemoveMenuAction) => void = (state, action) => {
  const id = action.payload;
  const index = state.items.findIndex((item) => item.id === id);
  if (index !== -1) {
    state.items.splice(index, 1);
  }
};

type StateUpdateAction = {
  payload: {
    id: string;
    index: number;
    value: ToDoState;
  };
};

const setIngredientState: (state: MenuState, action: StateUpdateAction) => void = (
  state,
  action,
) => {
  const { id, index, value } = action.payload;
  const item = state.items.find((item) => item.id === id);
  if (item) {
    item.ingredientsCompletions[index] = value;
  }
};

const setInstructionState: (state: MenuState, action: StateUpdateAction) => void = (
  state,
  action,
) => {
  const { id, index, value } = action.payload;
  const item = state.items.find((item) => item.id === id);
  if (item) {
    item.instructionsCompletions[index] = value;
  }
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addItem: addMenuItem,
    removeItem: removeMenuItem,
    setIngredientState,
    setInstructionState,
  },
});
