import fs from "fs";
import path from "path";
import matter from "gray-matter";

const RECIPES_DIR = path.join(process.cwd(), "recipes");

let promiseRecipe: Promise<Recipe[]>;

/**
 * reads all recipe files from filesystem and returns them as an array
 */
export async function getRecipes(): Promise<Recipe[]> {
  if (!promiseRecipe) {
    promiseRecipe = new Promise((resolve, reject) => {
      fs.readdir(RECIPES_DIR, (err, files) => {
        if (err) {
          reject(err);
        } else {
          const recipes: Recipe[] = [];
          files.forEach((file) => {
            const recipe = readRecipe(file);
            if (recipe) {
              recipes.push(recipe);
            }
          });
          resolve(recipes);
        }
      });
    });
  }
  return promiseRecipe;
}

/**
 * Read file and parse as md file with front matter
 * @param id File name to be read from file system
 */
function readRecipe(filename: string): Recipe | undefined {
  const filePath = path.join(RECIPES_DIR, filename);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const recipe = parseRecipe(fileContent);
  if (recipe) {
    recipe.id = filename.replace(".md", "");
    recipe.image = path.join("/img", recipe.image || "default.jpg");
  }
  return recipe;
}

function parseRecipe(fileContent: string): Recipe | undefined {
  const { data, content }: { data: RecipeMatter; content: string } = matter(
    fileContent,
  ) as unknown as { data: RecipeMatter; content: string };
  const lines = content
    .split("\n")
    .map((line) => line.replace(/#+\s*.*/, "").trim())
    .filter((line) => line.length > 0);
  const ingredients = lines
    .filter((line) => line.startsWith("-"))
    .map((line) => line.replace(/^-\s*/, ""));
  const instructions = lines
    .filter((line) => !line.startsWith("-"))
    .map((line) => line.replace(/^\d+\.\s*/, ""));

  const recipe: Recipe = {
    ...data,
    ingredients,
    instructions,
  };
  return recipe;
}

export async function getRecipe(id: string): Promise<Recipe | undefined> {
  const recipes = await getRecipes();
  return recipes.find((recipe) => recipe.id === id);
}

/**
 * Gets file names from recipes directory
 */
export async function getRecipeIds(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(RECIPES_DIR, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.map((file) => file.replace(".md", "")));
      }
    });
  });
}

export function getRecipePathById(id: string): string {
  return path.join(RECIPES_DIR, `${id}.md`);
}
