type Recipe = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: number;
  taste: number;
  duration: number;
  date: string;
  ingredients: string[];
  instructions: string[];
  image: string;
};

type RecipeMatter = Omit<Recipe, "ingredients" | "instructions">;
