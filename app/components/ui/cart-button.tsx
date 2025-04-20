"use client";
import Link from "next/link";
import { useCartStore } from "@store/cart";
import { IconShoppingCart } from "@tabler/icons-react";
export default function CartButton() {
  const { cart } = useCartStore();
  return (
    <Link href="/cart" className="flex bg-white/80 p-1 rounded ">
      <IconShoppingCart />
      {cart.length}
    </Link>
  );
}
