"use client";
import Link from "next/link";
import { useCartStore } from "@store/cart";
import { IconShoppingCart } from "@tabler/icons-react";
export default function CartButton() {
  const { getLength } = useCartStore();
  return (
    <Link href="/cart" className="flex  p-1 rounded text-white ">
      <IconShoppingCart />
      {getLength()}
    </Link>
  );
}
