import { create } from "zustand";

interface CartStore {
  cart: ProductInCart[];
  addToCart: (product: ProductInCart) => void;
  getTotal: () => number;
}
export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const { cart } = get();

    const newCartList = [...cart, product];

    set({ cart: newCartList });
  },
  getTotal: () => {
    const { cart } = get();

    return cart.reduce(
      (acc, value) => acc + value.retail_price * value.quantity,
      0
    );
  },
}));
