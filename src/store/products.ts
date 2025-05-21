import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductStore {
  list: Product[];
  addOne: (product: Product) => void;
  getProducts: (quantity: number) => Promise<void>;
  deleteOne: (id: string) => void;
  filterByName: (name: string) => void;
  getAvaliblesCategories: () => { category: string; subCategories: string[] }[];
}
export const useProductStore = create(
  persist<ProductStore>(
    (set, get) => ({
      list: [],
      addOne: (product) => {
        const { list } = get();

        const newList = [product, ...list];

        set({ list: newList });
      },
      getProducts: async (quantity) => {
        const res = await fetch(
          `https://connect-api-nzza.onrender.com/products?q=${quantity}`,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          set({ list: data.products });
        }
      },
      deleteOne: (id) => {
        const { list } = get();

        const filteredList = list.filter((prod) => prod._id !== id);

        set({ list: filteredList });
      },
      filterByName: (name) => {
        const { list } = get();

        const filtered = list.filter((item) =>
          item.title.toLowerCase().includes(name.toLowerCase())
        );

        set({ list: name !== "" ? filtered : list });
      },
      getAvaliblesCategories: () => {
        const { list } = get();

        const groupedByCategory = Object.groupBy(list, (item) => item.category);
        return Object.entries(groupedByCategory).map(([category, prod]) => ({
          category,
          // Usamos Set para subcategorías únicas y limitamos a 4
          subCategories: [...new Set(prod?.map((p) => p.sub_category))],
        }));
      },
    }),
    { name: "connect-rosario-products" }
  )
);
