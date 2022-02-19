import type { NextPage } from "next";
import Head from "next/head";
import BigButton from "../components/BigButton";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Mutfakta</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative flex h-screen w-screen flex-col items-center justify-center rounded-md bg-orange-300">
        <div className="fixed top-4 left-4 h-10 w-10 bg-orange-600 bg-cover [mask-image:url('/img/menu.svg')]"></div>

        <div className="m-16 h-36 w-36 rounded-full border-4 border-orange-100 bg-orange-600 bg-[url('/img/burger.png')] bg-cover"></div>

        <BigButton icon="/img/breakfast.png" onClick={() => {}}>
          Kahvaltı
        </BigButton>
        <BigButton icon="/img/meal.png" onClick={() => {}}>
          Ana yemek
        </BigButton>
        <BigButton icon="/img/snacks.png" onClick={() => {}}>
          Atıştırmalık
        </BigButton>
        <BigButton icon="/img/meze.png" onClick={() => {}}>
          Meze
        </BigButton>
      </div>
    </div>
  );
};

export default Home;
