"use client";
import ProductCard from "@components/shared/product-card";
import { useEffect, useState } from "react";

interface Props {
  products: Product[];
  limit: number;
  itemsPerPage?: number; // Opcional, cuántos productos se muestran a la vez
}

export default function NewIncomes({
  products,
  limit,
  itemsPerPage = 3,
}: Props) {
  const [position, setPosition] = useState(0);
  const sortedProducts = [...products].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const slicedProducts = sortedProducts.slice(0, limit);

  // Calcular el número máximo de posiciones
  const maxPosition = Math.ceil(slicedProducts.length / itemsPerPage) - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setPosition((pos) => (pos === maxPosition ? 0 : pos + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [maxPosition]);

  // Funciones para controles manuales
  const handleNext = () => {
    setPosition((pos) => (pos === maxPosition ? 0 : pos + 1));
  };

  const handlePrev = () => {
    setPosition((pos) => (pos === 0 ? maxPosition : pos - 1));
  };

  return (
    <section className="w-full border border-brand-1 rounded-md p-3">
      <h3 className="text-2xl font-bold text-brand-1">Nuevos Ingresos</h3>

      <div className="relative">
        <ul
          className="flex overflow-y-hidden overflow-x-auto w-full p-2"
          role="region"
          aria-label="Carrusel de nuevos ingresos"
        >
          <div
            style={{
              transform: `translateX(-${position * (100 / itemsPerPage)}%)`,
              width: `${slicedProducts.length * (100 / itemsPerPage)}%`,
            }}
            className="flex gap-3 transition-transform"
          >
            {slicedProducts.map((prod) => (
              <ProductCard prod={prod} key={prod._id} />
            ))}
          </div>
        </ul>
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-brand-1 text-white p-2 rounded-full"
          aria-label="Anterior"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-brand-1 text-white p-2 rounded-full"
          aria-label="Siguiente"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
