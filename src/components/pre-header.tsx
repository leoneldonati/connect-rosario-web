import { getAvalibleCategories } from "@actions/products";
import Link from "next/link";

export default async function PreHeader() {
  const { categories } = await getAvalibleCategories();
  return (
    <header className="p-3 hidden md:block max-w-full overflow-hidden">
      <p className="text-center text-xl font-bold text-brand-1">Categorías</p>
      <div className="w-full p-4 overflow-x-auto flex flex-row justify-center gap-3">
        {categories.length === 0 && (
          <strong className="text-red-500">
            No hay categorías disponibles
          </strong>
        )}
        {categories.map((category, index) => (
          <Link
            className="truncated overflow-ellipsis text-nowrap font-bold bg-brand-1 text-white p-1 rounded"
            href={`/categories/${encodeURIComponent(category)}`}
            key={index}
          >
            {category}
          </Link>
        ))}
      </div>
    </header>
  );
}
