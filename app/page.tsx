import mock from "@mock.json";
import CarouselAuto from "@components/ui/carousel-auto";
import ProductCard from "@components/shared/product-card";
import NewIncomes from "@components/ui/new-incomes";
export default function Home() {
  return (
    <section>
      <CarouselAuto />

      <NewIncomes products={mock} limit={15} />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 max-w-[800px] mx-auto gap-3 px-2 py-3 place-items-center">
        {mock.map((prod) => (
          <ProductCard prod={prod} key={prod._id} />
        ))}
      </div>
    </section>
  );
}
