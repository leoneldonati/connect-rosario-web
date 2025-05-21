"use client";

import { useState } from "react";
import AsideDesplegableMenu from "./aside-desplegable-menu";
import { IconMenu2 } from "@tabler/icons-react";
import Logo from "@components/shared/logo";

export default function MobileMenu() {
  const [opened, setOpened] = useState(false);
  return (
    <aside className="relative block md:hidden">
      <button
        onClick={() => setOpened((prev) => !prev)}
        className="text-white rounded-full p-1 transition-colors active:bg-white active:text-brand-1"
      >
        <IconMenu2 />
      </button>

      <div
        className={`fixed z-50 left-0 top-0 bg-white px-4 py-8 h-screen transition-transform ${
          opened ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setOpened((prev) => !prev)}
          className="text-brand-1 rounded-full p-1 transition-colors active:bg-brand-1 active:text-white "
        >
          <IconMenu2 />
        </button>

        <div className="bg-brand-1 flex w-fit mx-auto my-5 p-2 rounded-md">
          <Logo />
        </div>

        <AsideDesplegableMenu />
      </div>
    </aside>
  );
}
