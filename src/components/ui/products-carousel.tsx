"use client";

import ProductCard from "@components/shared/product-card";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ProductsCarousel({
  products,
  isAdmin,
  isWholesale,
}: {
  products: Product[];
  isAdmin: boolean;
  isWholesale: boolean;
}) {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setPosition((pos) => (pos === products.length - 3 ? 0 : pos + 1));
    }, 4500);

    return () => clearInterval(intervalTimer);
  }, [products.length]);
  return (
    <div className="max-w-full overflow-hidden">
      <div className="flex flex-col items-center">
        <ul
          className="flex overflow-y-hidden overflow-x-hidden w-full p-2"
          role="region"
          aria-label="Carrusel de nuevos ingresos"
        >
          <div
            style={{
              transform: `translateX(-${(position * 100) / products.length}%)`,
            }}
            className="flex gap-3 transition-transform"
          >
            {products.length > 0 ? (
              products.map((prod) => (
                <div key={prod._id} className="flex-shrink-0">
                  <ProductCard
                    prod={prod}
                    isWholesale={isWholesale}
                    isAdmin={isAdmin}
                  />
                </div>
              ))
            ) : (
              <div className="w-full text-center text-gray-500">
                No hay productos disponibles
              </div>
            )}
          </div>
        </ul>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPosition((pos) => (pos === 0 ? 0 : pos - 1))}
            className="p-1 rounded-full bg-brand-1 text-white"
            aria-label="Anterior"
          >
            <IconArrowLeft />
          </button>

          <button
            onClick={() =>
              setPosition((pos) => (pos === products.length - 3 ? 0 : pos + 1))
            }
            className="p-1 rounded-full bg-brand-1 text-white"
            aria-label="Siguiente"
          >
            <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
