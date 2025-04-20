"use client";
import Logo from "../shared/logo";
import Link from "next/link";
import mock from "@mock.json";
import { IconMenu4 } from "@tabler/icons-react";

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
      onClick={close}
      style={{
        transform: opened ? "translateX(0%)" : "translateX(100%)",
      }}
      className="bg-brand-1 flex flex-col items-center gap-4 fixed z-50 right-0 top-0 px-4 pt-8 h-screen  transition-transform"
    >
      <div className="w-full items-center flex">
        <button
          onClick={close}
          className="bg-white rounded p-1 transition-transform active:scale-95"
        >
          <IconMenu4 />
        </button>
      </div>

      <Logo />

      <ul className="flex flex-col items-start gap-2 text-white">
        {categories.map((category, index) => (
          <Link
            href={`/categories/${category}`}
            key={index}
            className="capitalize text-xl bg-white rounded-md p-1 text-brand-1 w-full"
          >
            {category}
          </Link>
        ))}
      </ul>
    </aside>
  );
}
