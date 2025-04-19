import ProductCard from "@components/shared/product-card";

interface Props {
  products: Product[];
  limit: number;
}
export default function NewIncomes({ products, limit }: Props) {
  const sortedProducts = [...products].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const slicedProducts = sortedProducts.slice(0, limit);
  return (
    <section className="w-full border border-brand-1 rounded-md p-3 ">
      <h3 className="text-2xl font-bold text-brand-1">Nuevos Ingresos</h3>

      <ul className="flex gap-3 overflow-y-hidden overflow-x-auto w-full p-2">
        {slicedProducts.map((prod) => (
          <ProductCard prod={prod} key={prod._id} />
        ))}
      </ul>
    </section>
  );
}
