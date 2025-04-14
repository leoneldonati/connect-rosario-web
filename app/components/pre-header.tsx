import mock from "@mock.json";
import Link from "next/link";

export default function PreHeader() {
  const grouped = Object.groupBy(mock, (prod) => prod.category);
  const categories = Object.keys(grouped);
  return (
    <header className="p-3 hidden md:block w-2xl mx-auto overflow-hidden">
      <p className="text-center text-xl font-bold">Categorías</p>
      <div className="w-full p-4 overflow-x-auto flex flex-row justify-between gap-3">
        {categories.map((category, index) => (
          <Link
            className="truncated overflow-ellipsis text-nowrap font-bold underline text-accent-1"
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
