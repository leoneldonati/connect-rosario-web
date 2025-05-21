import ProductsCarousel from "./products-carousel";

interface Props {
  limit: number;
  isAdmin: boolean;
  list: Product[];
}

export default function NewIncomes({ limit, isAdmin, list }: Props) {
  const sortedProducts = [...list].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const slicedProducts = sortedProducts.slice(0, limit);

  return (
    <section className="w-full animate-move-bg transition-colors duration-200 rounded-md p-3">
      <h3 className="text-2xl font-bold text-white">Nuevos Ingresos</h3>

      <ProductsCarousel isAdmin={isAdmin} products={slicedProducts} />
    </section>
  );
}
