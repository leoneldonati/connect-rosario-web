import mock from "@mock.json";
import CarouselAuto from "@components/ui/carousel-auto";
import ProductCard from "@components/shared/product-card";
import NewIncomes from "@components/ui/new-incomes";
export default function Home() {
  const sortedByGroup = Object.groupBy(mock, (prod) => prod.category);
  const arrayGrouped = Object.entries(sortedByGroup).map(
    ([category, products]) => ({ category, products })
  );
  return (
    <section className="flex flex-col gap-4">
      <CarouselAuto />

      <NewIncomes products={mock} limit={15} />

      {arrayGrouped.map(({ category, products }) => (
        <article key={category}>
          <h3 className="font-bold text-2xl text-brand-1 underline-offset-2 underline">
            {category}
          </h3>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 max-w-[800px] mx-auto gap-3 px-2 py-3 place-items-center">
            {products?.map((prod) => (
              <ProductCard prod={prod} key={prod._id} />
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
