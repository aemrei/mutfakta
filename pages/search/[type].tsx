import { getRecipes, getRecipeTypes } from "@/utils/recipes";
import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";

type SearchPageProps = {
  recipeList: Recipe[] | null;
};

export default function SearchPage({ recipeList }: SearchPageProps): JSX.Element {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search foods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Search {router.query.type}</h1>
        <ul>
          {recipeList ? (
            recipeList.map((recipe) => (
              <li key={recipe.id}>
                <NextLink href={`/recipe/${recipe.id}`} passHref>
                  <a>
                    <h2>{recipe.title}</h2>
                  </a>
                </NextLink>
                <p>{recipe.description}</p>
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
