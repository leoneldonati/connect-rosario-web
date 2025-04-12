import { create } from "zustand";

interface CartStore {
  cart: ProductInCart[];
  addToCart: (product: ProductInCart) => void;
}
export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const { cart } = get();

    const newCartList = [...cart, product];

    set({ cart: newCartList });
  },
}));
