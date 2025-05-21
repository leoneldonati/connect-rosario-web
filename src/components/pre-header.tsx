import { getAvaliblesCategories } from "@actions/products";
import { IconTriangleFilled } from "@tabler/icons-react";
import Link from "next/link";
import PreHeaderButton from "./ui/pre-header-button";

export default async function PreHeader() {
  const { avalibleCategories } = await getAvaliblesCategories();

  if (!avalibleCategories) return false;

  return (
    <header className="hidden md:flex max-w-full flex-row shadow-xl shadow-black/10 sticky top-24 z-40 bg-white mb-4">
      {avalibleCategories.length === 0 && (
        <strong className="text-red-500">No hay categorías disponibles</strong>
      )}
      {avalibleCategories.map(({ category, subCategories }, index) => {
        const currentHref = `/categories/${encodeURIComponent(category)}`;

        return (
          <div key={index} className="relative group">
            <PreHeaderButton currentHref={currentHref} category={category} />
            <div className="absolute z-50 left-0 top-full mt-0 min-h-20 py-4 bg-white shadow-xl opacity-0 rounded pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
              {subCategories?.map((subCategory, subIndex) => (
                <Link
                  key={subIndex}
                  href={`/categories/${encodeURIComponent(
                    category
                  )}/${encodeURIComponent(subCategory ?? "")}`}
                  className="block w-full text-left px-4 py-2 hover:bg-neutral-100 uppercase truncate"
                >
                  {subCategory}
                </Link>
              ))}
            </div>

            <IconTriangleFilled className="text-white absolute  -bottom-1 right-18 size-3 transition-opacity opacity-0 group-hover:opacity-100" />
          </div>
        );
      })}
    </header>
  );
}
