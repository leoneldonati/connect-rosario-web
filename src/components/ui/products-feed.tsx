"use client";

import ProductCard from "@components/shared/product-card";
import { useProductStore } from "@store/products";
import Link from "next/link";
import { useMemo } from "react";

export default function ProductsFeed({ isAdmin }: { isAdmin: boolean }) {
  const { list } = useProductStore();

  const arrayGrouped = useMemo(() => {
    const groupedObject = Object.groupBy(list, (item) => item.category);
    return Object.entries(groupedObject).map(([category, products]) => ({
      category,
      products,
    }));
  }, [list]);

  return arrayGrouped.map(({ category, products }) => (
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
      <div className="grid  sm:grid-cols-2 md:grid-cols-3 grid-cols-1 max-w-[800px] mx-auto gap-3 px-2 py-3 place-items-center">
        {products?.map((prod) => (
          <ProductCard prod={prod} key={prod._id} isAdmin={isAdmin} />
        ))}
      </div>
    </article>
  ));
}
