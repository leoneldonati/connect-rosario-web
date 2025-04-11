"use client";
import MenuSvg from "@assets/svg/menu-4.svg";
import Logo from "@components/shared/logo";
import Image from "next/image";
import LoginInput from "./login-input";
import Link from "next/link";
import mock from "@mock.json";

export default function AsideMenu({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const grouped = Object.groupBy(mock, (prod) => prod.category);
  const categories = Object.keys(grouped);

  return (
    <aside
      style={{
        transform: opened ? "translateX(0%)" : "translateX(100%)",
      }}
      className="bg-black flex flex-col items-start gap-4 fixed z-50 right-0 top-0 px-4 pt-8 h-screen  transition-transform"
    >
      <button
        onClick={close}
        className="bg-white rounded p-1 transition-transform active:scale-95"
      >
        <Image src={MenuSvg} alt="" />
      </button>

      <Logo />

      <LoginInput />

      <ul className="flex flex-col items-start gap-2 text-white">
        {categories.map((category, index) => (
          <Link
            href={`/categories/${category}`}
            key={index}
            className="capitalize text-xl"
          >
            {category}
          </Link>
        ))}
      </ul>
    </aside>
  );
}
