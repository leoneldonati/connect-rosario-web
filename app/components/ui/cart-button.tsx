"use client";
import Image from "next/image";
import Link from "next/link";
import cartSvg from "@assets/svg/shopping-cart-black.svg";
import { useCartStore } from "@store/cart";
export default function CartButton() {
  const { cart } = useCartStore();
  return (
    <Link href="/cart" className="flex bg-white/80 p-1 rounded ">
      <Image src={cartSvg} alt="" />
      {cart.length}
    </Link>
  );
}
