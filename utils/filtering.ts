import { FilterState } from "@/components/FilterCheckbox";
import { FilterConditions } from "store/FilterSlice";

export const filterSections = [
  {
    title: "Öğün",
    items: [
      { id: "yemek", text: "Yemek" },
      { id: "kahvalti", text: "Kahvaltı" },
      { id: "atistirma", text: "Atıştırma" },
      { id: "meze", text: "Meze" },
    ],
  },
  {
    title: "İçindekiler",
    items: [
      { id: "bakliyat", text: "Bakliyat" },
      { id: "et", text: "Et" },
      { id: "kiyma", text: "Kıyma" },
      { id: "balik", text: "Balık" },
      { id: "sebze", text: "Sebze" },
      { id: "sut", text: "Süt Ürünleri" },
      { id: "yumurta", text: "Yumurta" },
      { id: "meyve", text: "Meyve" },
      { id: "hamurisi", text: "Hamur İşi" },
    ],
  },
  {
    title: "Tür",
    items: [
      { id: "corba", text: "Çorba" },
      { id: "salata", text: "Salata" },
      { id: "tatli", text: "Tatlı" },
      { id: "aci", text: "Acı" },
      { id: "sicak", text: "Sıcak" },
      { id: "soguk", text: "Soğuk" },
      { id: "diyet", text: "Diyet" },
      { id: "premium", text: "Premium" },
    ],
  },
  {
    title: "Ekipman",
    items: [
      { id: "firin", text: "Fırın" },
      { id: "ocak", text: "Ocak" },
      { id: "tava", text: "Tava" },
      { id: "airfryer", text: "Air Fryer" },
      { id: "tencere", text: "Tencere" },
      { id: "blender", text: "Blender" },
      { id: "buzdolabı", text: "Buzdolabı" },
      { id: "tostmakinesi", text: "Tost Makinesi" },
    ],
  },
];

const tagCategoryMap = filterSections.reduce((acc: { [id: string]: string }, section) => {
  section.items.forEach((item) => {
    acc[item.id] = section.title;
  });
  return acc;
}, {});

export function getFilteredRecipes(recipes: Recipe[], filter: FilterConditions) {
  const { searchQuery, tags } = filter;
  const searchRegex = new RegExp(searchQuery, "i");
  const filteredRecipes = recipes.filter((recipe) => {
    if (!searchQuery) {
      return true;
    }
    const { title, description, ingredients, instructions } = recipe;
    const concatenated = [title, description, ingredients, instructions].flat().join(" ");
    return concatenated.match(searchRegex);
  });

  debugger;
  return filteredRecipes.filter((recipe) => {
    const categoryMatches = recipe.tags.reduce((acc, tagId) => {
      if (tags[tagId] === FilterState.Include) {
        acc[tagCategoryMap[tagId]] = true;
      }
      return acc;
    }, {} as { [category: string]: boolean });

    return Object.entries(tags).every((entry) => {
      const [key, value] = entry;
      if (value === FilterState.Ignore) {
        return true;
      }
      if (value === FilterState.Exclude) {
        return !recipe.tags.includes(key);
      }
      return categoryMatches[tagCategoryMap[key]];
    });
  });
}
