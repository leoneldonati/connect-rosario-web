"use client";
import Link from "next/link";
import Logo from "./shared/logo";
import CartButton from "./ui/cart-button";
import LoginInput from "./ui/login-input";
import Image from "next/image";
import MenuSvg from "@assets/svg/menu-4.svg";
import AsideMenu from "./ui/aside-menu";
import { useState } from "react";
export default function Header() {
  const [opened, setOpened] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full flex flex-row items-center justify-between bg-black p-4">
      <Link href="/">
        <Logo />
      </Link>

      <div className="hidden md:flex items-center gap-2 justify-between w-full pl-36">
        <LoginInput />
        <CartButton />
      </div>

      <AsideMenu opened={opened} close={() => setOpened(false)} />
      <button
        onClick={() => setOpened(true)}
        className="bg-white md:hidden inline-block rounded p-1 transition-transform active:scale-95"
      >
        <Image src={MenuSvg} alt="" />
      </button>
    </header>
  );
}
