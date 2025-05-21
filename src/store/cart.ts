import { create } from "zustand";
import { persist } from "zustand/middleware";
interface CartStore {
  list: ProductInCart[];
  getLength: () => number;
  getProductCount: (id: string) => number;
  action: (id: string, op: (quantity: number) => number) => void;
  addOne: (product: ProductInCart) => void;
  quiteOne: (id: string) => void;
  findById: (id: string) => boolean;
  getTotal: (isWholesale: boolean) => number;
}
export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      list: [],
      getLength: () => get().list.length,
      getProductCount: (id) => {
        const { list } = get();

        const prod = list.find((prod) => prod._id === id);

        if (!prod) return 0;

        return prod.quantity;
      },
      action: (id, op) => {
        const { list } = get();

        const updatedList = list.map((prod) => {
          if (prod._id === id) {
            const operation = op(prod?.quantity ?? 0);

            const updatedProd = { ...prod, quantity: operation };

            return updatedProd;
          }
          return prod;
        });

        set({ list: updatedList });
      },
      addOne: (prod) => {
        const { list, findById } = get();

        if (findById(prod._id)) {
          const filtered = list.filter((p) => p._id !== prod._id);

          set({ list: filtered });

          return;
        }
        const newList = [prod, ...list];

        set({ list: newList });
      },
      quiteOne: (id) => {
        const { list } = get();

        const filtered = list.filter((prod) => prod._id !== id);

        set({ list: filtered });
      },
      findById: (id) => {
        const { list } = get();

        return list.find((prod) => prod._id === id) !== undefined;
      },
      getTotal: (isWholesale) => {
        const { list } = get();

        const total = list.reduce(
          (acc, value) =>
            acc +
            (isWholesale ? value.wholesale_price : value.retail_price) *
              value.quantity,
          0
        );

        return total;
      },
    }),
    { name: "connect-rosario-cart" }
  )
);
