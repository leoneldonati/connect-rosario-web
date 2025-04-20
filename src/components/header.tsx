"use client";
import Link from "next/link";
import Logo from "./shared/logo";
import CartButton from "./ui/cart-button";
import AsideMenu from "./ui/aside-menu";
import { useState } from "react";
import { IconMenu4, IconUser } from "@tabler/icons-react";
export default function Header() {
  const [opened, setOpened] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full flex flex-row items-center justify-between bg-brand-1 p-4">
      <Link href="/">
        <Logo />
      </Link>

      <AsideMenu opened={opened} close={() => setOpened(false)} />

      <div className="flex gap-2 items-center">
        <Link href="/login" className="text-white bg-brand-1/30">
          <IconUser />
        </Link>
        <CartButton />
        <button
          onClick={() => setOpened(true)}
          className="bg-white md:hidden inline-block rounded p-1 transition-transform active:scale-95"
        >
          <IconMenu4 />
        </button>
      </div>
    </header>
  );
}
