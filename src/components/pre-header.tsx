"use client";
import { useProductStore } from "@store/products";
import { IconChevronDown, IconTriangleFilled } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function PreHeader() {
  const { list } = useProductStore();
  const pathName = usePathname();
  const router = useRouter();

  // Memoizamos las categorías para mejorar el rendimiento
  const categories = useMemo(() => {
    const groupedByCategory = Object.groupBy(list, (item) => item.category);
    return Object.entries(groupedByCategory).map(([category, prod]) => ({
      category,
      // Usamos Set para subcategorías únicas y limitamos a 4
      subCategories: [...new Set(prod?.map((p) => p.sub_category))].slice(0, 4),
    }));
  }, [list]);

  return (
    <header className="hidden md:flex max-w-full flex-row shadow-xl shadow-black/10 sticky top-24 z-50 bg-white">
      {categories.length === 0 && (
        <strong className="text-red-500">No hay categorías disponibles</strong>
      )}
      {categories.map(({ category, subCategories }, index) => {
        const currentHref = `/categories/${encodeURIComponent(category)}`;
        const isInPath = pathName === currentHref;

        return (
          <div key={index} className="relative group">
            <Link
              className={`flex items-center gap-1 px-2 py-4 uppercase transition-colors ${
                isInPath ? "bg-brand-1 text-white" : "text-brand-1"
              } hover:bg-brand-1 hover:text-white truncate`}
              href={currentHref}
            >
              {category} <IconChevronDown />
            </Link>
            <div className="absolute z-50 left-0 top-full mt-0 min-h-20 py-4 bg-white shadow-xl opacity-0 rounded pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
              {subCategories?.map((subCategory, subIndex) => (
                <button
                  key={subIndex}
                  onClick={() =>
                    router.push(
                      `/categories/${encodeURIComponent(
                        category
                      )}/${encodeURIComponent(subCategory ?? "")}`
                    )
                  }
                  className="block w-full text-left px-4 py-2 hover:bg-neutral-100 uppercase truncate"
                >
                  {subCategory}
                </button>
              ))}
            </div>

            <IconTriangleFilled className="text-white absolute  -bottom-1 right-18 size-3 transition-opacity opacity-0 group-hover:opacity-100" />
          </div>
        );
      })}
    </header>
  );
}
