"use client";

import Image from "next/image";
import CartSvg from "@assets/svg/shopping-cart.svg";
import { useCartStore } from "@store/cart";
import { toast } from "react-toastify";

interface Props {
  product: Product;
}
export default function AddCartButton({ product }: Props) {
  const { addToCart } = useCartStore();

  const handleClick = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success("¡Producto añadido al carro!");
  };
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md flex items-center justify-center gap-1"
    >
      <Image src={CartSvg} alt="" /> Añadir al carro
    </button>
  );
}
