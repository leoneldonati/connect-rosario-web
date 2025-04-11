"use client";
import Image from "next/image";
import Link from "next/link";
import cartSvg from "@assets/svg/shopping-cart.svg";
export default function CartButton() {
  return (
    <Link href="/" className="flex bg-white p-1 rounded">
      <Image src={cartSvg} alt="" />
    </Link>
  );
}
