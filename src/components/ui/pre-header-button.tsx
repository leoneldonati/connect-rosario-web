"use client";

import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  currentHref: string;
  category: string;
}
export default function PreHeaderButton({ currentHref, category }: Props) {
  const pathName = usePathname();
  const isInPath = pathName === currentHref;

  return (
    <Link
      className={`flex items-center gap-1 px-2 py-4 uppercase transition-colors ${
        isInPath ? "bg-brand-1 text-white" : "text-brand-1"
      } hover:bg-brand-1 hover:text-white truncate`}
      href={currentHref}
    >
      {category} <IconChevronDown />
    </Link>
  );
}
