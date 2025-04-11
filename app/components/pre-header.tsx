import mock from "@mock.json";
import Link from "next/link";

export default function PreHeader() {
  const grouped = Object.groupBy(mock, (prod) => prod.category);
  const categories = Object.keys(grouped);
  return (
    <header className="p-3 hidden md:flex flex-row justify-center gap-3">
      {categories.map((category, index) => (
        <Link
          href={`/categories/${category}`}
          key={index}
          className="capitalize"
        >
          {category}
        </Link>
      ))}
    </header>
  );
}
