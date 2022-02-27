type Recipe = {
  id: string;
  title: string;
  description: string;
  type: string[];
  content: string[];
  equipments: string[];
  difficulty: number;
  taste: number;
  duration: number;
  date: string;
  ingredients: string[];
  instructions: string[];
  image: string;
};

type RecipeMatter = Omit<Recipe, "ingredients" | "instructions">;
