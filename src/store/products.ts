import { create } from "zustand";

interface ProductStore {
  list: Product[];
  addOne: (product: Product) => void;
}
export const useProductStore = create<ProductStore>((set, get) => ({
  list: [],
  addOne: (product) => {
    const { list } = get();

    const newList = [product, ...list];

    set({ list: newList });
  },
}));
