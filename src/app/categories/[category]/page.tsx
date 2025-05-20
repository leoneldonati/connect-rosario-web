import { isAdmin, isWholesale } from "@actions/cookies";
import { getByCategory } from "@actions/products";
import ProductCard from "@components/shared/product-card";
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const decodedCategory = decodeURIComponent(category);

  const { products } = await getByCategory(category);

  const hasWholesale = await isWholesale();
  const hasAdmin = await isAdmin();
  return (
    <section className="p-2">
      <h2 className="text-2xl font-bold text-center my-4 bg-brand-1 text-white w-fit mx-auto p-2 rounded capitalize">
        {decodedCategory}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-3">
        {products?.map((prod) => (
          <ProductCard
            prod={prod}
            key={prod._id}
            isWholesale={hasWholesale}
            isAdmin={hasAdmin}
          />
        ))}
      </div>
    </section>
  );
}
