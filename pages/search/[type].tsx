import { getRecipes, getRecipeTypes } from "@/utils/recipes";
import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { recipeSlice } from "store/RecipeSlice";
import { MenuItem, menuSlice } from "store/MenuSlice";
import AddButton from "@/components/AddButton";
import FilterBar from "@/components/FilterBar";
import { useEffect, useState } from "react";
import { FilterState } from "@/components/FilterCheckbox";
import { FilterConditions, filterSlice } from "store/FilterSlice";
import { getFilteredRecipes } from "@/utils/filtering";

type SearchPageProps = {
  recipeList: Recipe[];
};

export default function SearchPage({ recipeList }: SearchPageProps): JSX.Element {
  const router = useRouter();
  const { type = [] } = router.query;
  const dispatch = useDispatch();
  const menuItems = useSelector<any, MenuItem[]>((state) => state.menu.items);
  const filter = useSelector<any, FilterConditions>((state) => state.filter);
  const [searchResult, setSearchResult] = useState<Recipe[]>([]);
  const typeStr = type + "";

  useEffect(() => {
    dispatch(recipeSlice.actions.setRecipeList(recipeList || []));
  }, [dispatch, recipeList]);

  useEffect(() => {
    dispatch(filterSlice.actions.clearFilter());
    dispatch(filterSlice.actions.setFilter({ id: typeStr, value: FilterState.Include }));
  }, [dispatch, typeStr]);

  useEffect(() => {
    const result = getFilteredRecipes(recipeList, filter);
    setSearchResult(result);
  }, [menuItems, filter, recipeList]);

  return (
    <div className="m-10">
      <Head>
        <title>Search</title>
        <meta name="description" content="Search foods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <ul className="flex flex-wrap items-center justify-center">
          {searchResult.map((recipe) => (
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
                      {!menuItems.find(
                        (item: { id: string | undefined }) => item.id === recipe.id,
                      ) && (
                        <AddButton
                          text="Ekle"
                          onClick={() => dispatch(menuSlice.actions.addItem(recipe))}
                        />
                      )}
                    </div>
                  </div>
                </a>
              </NextLink>
            </li>
          ))}
        </ul>
      </div>
      <FilterBar />
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
      recipeList: recipeList || [],
    },
  };
}
