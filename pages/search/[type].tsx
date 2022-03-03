import { getRecipes, getRecipeTypes } from "@/utils/recipes";
import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Image from "next/image";
import KnifeSVG from "@/components/KnifeSVG";
import { useDispatch } from "react-redux";
import { recipeSlice } from "store/RecipeSlice";
import { menuSlice } from "store/MenuSlice";

type SearchPageProps = {
  recipeList: Recipe[] | null;
};

export default function SearchPage({ recipeList }: SearchPageProps): JSX.Element {
  const router = useRouter();
  const { type } = router.query;
  const dispatch = useDispatch();
  dispatch(recipeSlice.actions.setRecipeList(recipeList || []));

  return (
    <div className="m-10">
      <Head>
        <title>Search</title>
        <meta name="description" content="Search foods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <ul className="flex flex-wrap items-center justify-center">
          {recipeList ? (
            recipeList.map((recipe) => (
              <li key={recipe.id} className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6">
                <NextLink href={`/recipe/${recipe.id}`} passHref>
                  <a>
                    <div className="m-3 overflow-hidden rounded-lg bg-orange-400 bg-gradient-to-b from-orange-300 to-orange-400 drop-shadow-lg">
                      <div className="relative inline-block w-full overflow-hidden rounded-full border-2 border-orange-400 pb-[100%]">
                        <Image src={recipe.image} alt={recipe.title} layout="fill" />
                      </div>
                      <div className="p-3">
                        <h2 className="text-sm font-bold">{recipe.title}</h2>
                        <p className="text-xs">{recipe.description}</p>
                      </div>
                      <div className="m-1 flex justify-end text-xs">
                        <button
                          className="rounded bg-green-700 px-1 pl-2 pr-0 font-bold text-orange-200 hover:bg-green-600"
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(menuSlice.actions.addItem(recipe));
                          }}
                        >
                          Add
                          <KnifeSVG className="inline" />
                        </button>
                      </div>
                    </div>
                  </a>
                </NextLink>
              </li>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
    </div>
  );
}

type SearchStaticProps = {
  params: {};
};

export async function getStaticPaths() {
  const types = await getRecipeTypes();
  return {
    paths: types.map((type) => ({ params: { type } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: SearchStaticProps): Promise<{ props: SearchPageProps }> {
  const recipeList = await getRecipes();

  return {
    props: {
      recipeList: recipeList || null,
    },
  };
}
