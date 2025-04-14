import ProductCard from "@components/shared/product-card";
import mock from "@mock.json";
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const decodedCategory = decodeURIComponent(category);

  const filterByCategory = mock.filter(
    (prod) => prod.category === decodedCategory
  );
  return (
    <section className="p-2">
      <h2 className="text-xl font-bold text-center my-4">{decodedCategory}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
        {filterByCategory.map((prod) => (
          <ProductCard prod={prod} key={prod._id} />
        ))}
      </div>
    </section>
  );
}
