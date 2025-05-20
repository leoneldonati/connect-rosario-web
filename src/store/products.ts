import { create } from "zustand";

interface ProductStore {
  list: Product[];
  addOne: (product: Product) => void;
  addMultiple: (products: Product[]) => void;
  deleteOne: (id: string) => void;
  filterByName: (name: string) => void;
}
export const useProductStore = create<ProductStore>((set, get) => ({
  list: [],
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
}));
