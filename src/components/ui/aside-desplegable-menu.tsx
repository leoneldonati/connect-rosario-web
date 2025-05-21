"use client";

import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  avaliblesCategories: { category: string; subCategories: string[] }[];
}

export default function AsideDesplegableMenu({ avaliblesCategories }: Props) {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  return (
    <div>
      {avaliblesCategories.map(({ category, subCategories }) => (
        <div key={category}>
          <div
            onClick={() =>
              setExpandedCategories((prev) => ({
                ...prev,
                [category]: !prev[category],
              }))
            }
            className="py-2 flex w-full justify-between items-center cursor-pointer"
          >
            <Link
              href={`/categories/${encodeURIComponent(category)}`}
              className="font-bold uppercase transition-colors hover:text-orange-400"
            >
              {category}
            </Link>

            <button
              aria-expanded={expandedCategories[category] || false}
              className="focus:outline-none"
            >
              <IconChevronDown
                className={`transition-transform duration-300 ${
                  expandedCategories[category] ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <ul
            className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out border-l border-neutral-200 pl-4 ${
              expandedCategories[category] ? "max-h-96" : "max-h-0"
            }`}
          >
            {subCategories.map((sub, index) => (
              <li key={index}>
                <Link
                  href={`/categories/${encodeURIComponent(
                    category
                  )}/${encodeURIComponent(sub)}`}
                  className="transition-colors hover:text-orange-400 uppercase"
                >
                  {sub}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
