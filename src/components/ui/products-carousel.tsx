"use client";

import ProductCard from "@components/shared/product-card";
import { use } from "react";

export default function ProductsCarousel({
  promise,
  isAdmin,
  isWholesale,
}: {
  promise: Promise<{
    error: boolean;
    products: Product[] | null;
  }>;
  isAdmin: Promise<boolean>;
  isWholesale: Promise<boolean>;
}) {
  const { products } = use(promise);
  const admin = use(isAdmin);
  const wholesale = use(isWholesale);
  return (
    <div className="max-w-full overflow-hidden">
      <ul className="flex flex-nowrap overflow-y-hidden overflow-x-auto w-full p-2">
        {products?.map((product) => (
          <ProductCard
            prod={product}
            key={product._id}
            isAdmin={admin}
            isWholesale={wholesale}
          />
        ))}
      </ul>
    </div>
  );
}
