"use client";

import ProductCard from "@components/shared/product-card";
import Link from "next/link";
import { useMemo } from "react";

interface Props {
  isAdmin: boolean;
  products: Product[];
}
export default function ProductsFeed({ isAdmin, products }: Props) {
  const arrayGrouped = useMemo(() => {
    const groupedObject = Object.groupBy(products, (item) => item.category);
    return Object.entries(groupedObject).map(([category, prods]) => ({
      category,
      prods,
    }));
  }, [products]);

  return arrayGrouped.map(({ category, prods }) => (
    <article key={category}>
      <Link
        href={`/categories/${encodeURIComponent(category)}`}
        title={`Ver ${category}`}
        aria-label={category}
      >
        <h3 className="font-bold text-2xl text-brand-1 underline-offset-2 capitalize">
          {category}
        </h3>
      </Link>
      <div className="grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-3 px-2 py-3 place-items-center">
        {prods?.map((prod) => (
          <ProductCard prod={prod} key={prod._id} isAdmin={isAdmin} />
        ))}
      </div>
    </article>
  ));
}
