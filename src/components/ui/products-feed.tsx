"use client";

import { getAll } from "@actions/products";
import ProductCard from "@components/shared/product-card";
import { useProductStore } from "@store/products";
import Link from "next/link";
import { useEffect } from "react";

export default function ProductsFeed({
  isAdmin,
  hasWholesale,
}: {
  isAdmin: boolean;
  hasWholesale: boolean;
}) {
  const { list, setList } = useProductStore();
  const sortedByGroup = Object.groupBy(list, (prod) => prod.category);
  const arrayGrouped = Object.entries(sortedByGroup).map(
    ([category, products]) => ({ category, products })
  );

  useEffect(() => {
    if (list.length === 0) {
      getAll().then((resolved) => {
        setList(resolved.products ?? []);
      });
    }
  }, []);
  return arrayGrouped.map(({ category, products }) => (
    <article key={category}>
      <Link
        href={`/categories/${encodeURIComponent(category)}`}
        title={`Ver ${category}`}
      >
        <h3 className="font-bold text-2xl text-brand-1 underline-offset-2 capitalize">
          {category}
        </h3>
      </Link>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 max-w-[800px] mx-auto gap-3 px-2 py-3 place-items-center">
        {products?.map((prod) => (
          <ProductCard
            prod={prod}
            key={prod._id}
            isAdmin={isAdmin}
            isWholesale={hasWholesale}
          />
        ))}
      </div>
    </article>
  ));
}
