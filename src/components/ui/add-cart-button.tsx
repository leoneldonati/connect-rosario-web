"use client";

import { useCartStore } from "../../store/cart";
import { IconShoppingCart, IconShoppingCartOff } from "@tabler/icons-react";
import { toast } from "react-toastify";

interface Props {
  product: Product;
}
export default function AddCartButton({ product }: Props) {
  const { addOne, findById } = useCartStore();

  const handleClick = () => {
    addOne({ ...product, quantity: 1 });
    if (!findById(product._id))
      return toast.success("¡Producto eliminado del carro!");
    toast.success("¡Producto añadido al carro!");
  };
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md flex items-center justify-center gap-1"
    >
      {findById(product._id) ? (
        <span className="flex items-center gap-1">
          <IconShoppingCartOff /> Quitar del carro
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <IconShoppingCart /> Añadir al carro
        </span>
      )}
    </button>
  );
}
