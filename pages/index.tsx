import type { NextPage } from "next";
import BigButton from "@/components/BigButton";

const Home: NextPage = () => {
  return (
    <>
      <div className="m-16 h-36 w-36 rounded-full border-4 border-orange-100 bg-orange-600 bg-[url('/img/burger.png')] bg-cover"></div>

      <BigButton icon="/img/breakfast.png" href="/search/kahvalti" onClick={() => {}}>
        Kahvaltı
      </BigButton>
      <BigButton icon="/img/meal.png" href="/search/yemek" onClick={() => {}}>
        Yemek
      </BigButton>
      <BigButton icon="/img/snacks.png" href="/search/atistirmalik" onClick={() => {}}>
        Atıştırmalık
      </BigButton>
      <BigButton icon="/img/meze.png" href="/search/meze" onClick={() => {}}>
        Meze
      </BigButton>
    </>
  );
};

export default Home;
