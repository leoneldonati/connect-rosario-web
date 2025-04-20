"use client";
import ProductCard from "../shared/product-card";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface Props {
  products: Product[];
  limit: number;
  isWholesale: boolean;
}

export default function NewIncomes({ products, limit, isWholesale }: Props) {
  const sortedProducts = [...products].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const slicedProducts = sortedProducts.slice(0, limit);

  const [position, setPosition] = useState(0);
  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setPosition((pos) => (pos === slicedProducts.length - 3 ? 0 : pos + 1));
    }, 4500);

    return () => clearInterval(intervalTimer);
  }, [slicedProducts.length]);
  return (
    <section className="w-full border border-brand-1 rounded-md p-3">
      <h3 className="text-2xl font-bold text-brand-1">Nuevos Ingresos</h3>

      <div className="flex flex-col items-center">
        <ul
          className="flex overflow-y-hidden overflow-x-hidden w-full p-2"
          role="region"
          aria-label="Carrusel de nuevos ingresos"
        >
          <div
            style={{
              transform: `translateX(-${
                (position * 100) / slicedProducts.length
              }%)`,
            }}
            className="flex gap-3 transition-transform"
          >
            {slicedProducts.length > 0 ? (
              slicedProducts.map((prod) => (
                <div key={prod._id} className="flex-shrink-0">
                  <ProductCard prod={prod} isWholesale={isWholesale} />
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
              setPosition((pos) =>
                pos === slicedProducts.length - 3 ? 0 : pos + 1
              )
            }
            className="p-1 rounded-full bg-brand-1 text-white"
            aria-label="Siguiente"
          >
            <IconArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
