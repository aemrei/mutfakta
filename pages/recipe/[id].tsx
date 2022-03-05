import Head from "next/head";
import { getRecipe, getRecipeIds } from "@/utils/recipes";
import Image from "next/image";
import ToDoCheckbox, { ToDoState } from "@/components/ToDoCheckbox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, menuSlice } from "store/MenuSlice";
import AddButton from "@/components/AddButton";
import CompleteButton from "@/components/CompleteButton";
import MenuList from "@/components/MenuList";

type RecipePageProps = {
  recipe: Recipe | null;
};

export default function RecipePage({ recipe }: RecipePageProps): JSX.Element {
  const dispatch = useDispatch();
  const menuItem = useSelector<any, MenuItem>((state) =>
    state.menu.items.find((item: { id: string | undefined }) => item.id === recipe?.id),
  );
  const [state, setState] = useState(ToDoState.NotStarted);
  const onChange = (state: ToDoState) => {
    setState(state);
  };

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
        {!menuItem && (
          <AddButton
            className="mt-3"
            text="Ekle"
            onClick={() => dispatch(menuSlice.actions.addItem(recipe))}
          />
        )}
        <div className="">
          <h2 className="mt-5 font-bold">Malzemeler</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="my-2">
                <div className="relative">
                  <ToDoCheckbox
                    state={menuItem?.ingredientsCompletions[index] || ToDoState.NotStarted}
                    onChange={(value) =>
                      dispatch(
                        menuSlice.actions.setIngredientState({ id: recipe.id, index, value }),
                      )
                    }
                    showBox={!!menuItem}
                    text={ingredient}
                  />
                </div>
              </li>
            ))}
          </ul>
          <h2 className="mt-5 font-bold">Yapılışı</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="my-2">
                <div className="relative">
                  <ToDoCheckbox
                    state={menuItem?.instructionsCompletions[index] || ToDoState.NotStarted}
                    onChange={(value) =>
                      dispatch(
                        menuSlice.actions.setInstructionState({ id: recipe.id, index, value }),
                      )
                    }
                    showBox={!!menuItem}
                    text={instruction}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </article>
      <div className="mt-5 flex justify-around">
        {!!menuItem && (
          <CompleteButton
            text="Tamamla"
            onClick={() => dispatch(menuSlice.actions.removeItem(recipe.id))}
          />
        )}
      </div>
      <MenuList />
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
  const recipe = await getRecipe(params.id);

  return {
    props: {
      recipe: recipe || null,
    },
  };
}
