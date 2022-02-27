import Head from "next/head";
import { getRecipe, getRecipeIds } from "@/utils/recipes";
import Image from "next/image";

type RecipePageProps = {
  recipe: Recipe | null;
};

export default function RecipePage({ recipe }: RecipePageProps) {
  if (!recipe) {
    return <div>Loading...</div>;
  }
  return (
    <div className="m-10">
      <Head>
        <title>{recipe.title}</title>
        <meta name="description" content={recipe.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="flex flex-col items-center justify-center">
        <div className="relative inline-block h-52 w-52 overflow-hidden rounded-full">
          <Image src={recipe.image} alt={recipe.title} layout="fill" />
          <h1 className="absolute top-2/3 w-full bg-orange-200 text-center font-extrabold bg-blend-multiply">
            {recipe.title}
          </h1>
        </div>
        <p className="text-xs">{recipe.description}</p>
        <div className="">
          <h2 className="mt-5 font-bold">Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="my-2">
                {ingredient}
              </li>
            ))}
          </ul>
          <h2 className="mt-5 font-bold">Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="my-2">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </article>
    </div>
  );
}

type RecipeStaticProps = {
  params: {
    id: string;
  };
};

export async function getStaticPaths() {
  const id = await getRecipeIds();
  return {
    paths: id.map((id) => ({ params: { id } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: RecipeStaticProps): Promise<{ props: RecipePageProps }> {
  console.log({ params });
  const recipe = await getRecipe(params.id);

  return {
    props: {
      recipe: recipe || null,
    },
  };
}
