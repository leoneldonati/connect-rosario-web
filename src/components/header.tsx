"use client";
import Link from "next/link";
import Logo from "./shared/logo";
import CartButton from "./ui/cart-button";
import { IconUser } from "@tabler/icons-react";
import SearchBar from "./ui/search-bar";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-row items-center justify-between bg-gradient-to-tr from-brand-1 via-indigo-500 to-brand-1 p-4">
      <Link href="/">
        <Logo />
      </Link>

      <SearchBar />
      <div className="flex gap-2 items-center">
        <Link href="/login" className="text-white bg-brand-1/30">
          <IconUser />
        </Link>
        <CartButton />
      </div>
    </header>
  );
}
