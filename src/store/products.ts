import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductStore {
  list: Product[];
  setList: (list: Product[]) => void;
  addOne: (product: Product) => void;
  addMultiple: (products: Product[]) => void;
}
export const useProductStore = create(
  persist<ProductStore>(
    (set, get) => ({
      list: [],
      setList: (list) => {
        set({ list });
      },
      addOne: (product) => {
        const { list } = get();

        const newList = [product, ...list];

        set({ list: newList });
      },
      addMultiple: (prods) => {
        const { list } = get();

        const newList = [...prods, ...list];

        set({ list: newList });
      },
    }),
    { name: "connect-products-store" }
  )
);
