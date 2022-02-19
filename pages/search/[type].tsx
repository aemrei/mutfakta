import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const SearchPage: NextPage = ({}) => {
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
      </div>
    </div>
  );
};

export default SearchPage;
