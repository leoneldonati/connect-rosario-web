"use client";

import ProductCard from "@components/shared/product-card";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

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
  const [numVisibleProducts, setNumVisibleProducts] = useState(1); // Valor inicial
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calcular cuántos productos caben en el área visible
  useEffect(() => {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.offsetWidth;
      const cardWidthWithGap = 230 + 4; // 230px (tarjeta) + 4px (gap)
      const visibleProducts = Math.floor(carouselWidth / cardWidthWithGap);
      setNumVisibleProducts(Math.max(1, visibleProducts)); // Asegurar al menos 1
    }
  }, [products.length]);

  // Intervalo automático
  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setPosition((pos) => {
        const maxPosition = products.length - numVisibleProducts;
        return pos >= maxPosition ? 0 : pos + 1;
      });
    }, 4500);

    return () => clearInterval(intervalTimer);
  }, [products.length, numVisibleProducts]);

  // Calcular el desplazamiento en píxeles
  const cardWidthWithGap = 230 + 4; // 230px (tarjeta) + 4px (gap)
  const translateX = `-${position * cardWidthWithGap}px`;

  return (
    <div className="max-w-full overflow-hidden" ref={carouselRef}>
      <div className="flex flex-col items-center">
        <ul
          className="flex overflow-y-hidden overflow-x-hidden w-full p-2"
          role="region"
          aria-label="Carrusel de nuevos ingresos"
        >
          <div
            style={{
              transform: `translateX(${translateX})`,
              width: `${products.length * cardWidthWithGap}px`, // Asegurar que el contenedor sea lo suficientemente ancho
            }}
            className="flex gap-1 transition-transform duration-300"
          >
            {products.length > 0 ? (
              products.map((prod) => (
                <div
                  key={prod._id}
                  className="flex-shrink-0"
                  style={{ width: "230px" }} // Ancho fijo de la tarjeta
                >
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
            disabled={position === 0}
          >
            <IconArrowLeft />
          </button>

          <button
            onClick={() =>
              setPosition((pos) => {
                const maxPosition = products.length - numVisibleProducts;
                return pos >= maxPosition ? 0 : pos + 1;
              })
            }
            className="p-1 rounded-full bg-brand-1 text-white"
            aria-label="Siguiente"
            disabled={position >= products.length - numVisibleProducts}
          >
            <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
