import mock from "@mock.json";
import CarouselAuto from "../components/ui/carousel-auto";
import ProductCard from "../components/shared/product-card";
import NewIncomes from "../components/ui/new-incomes";
import { isWholesale } from "@actions/cookies";
import { IconShoppingCartDiscount } from "@tabler/icons-react";
import CloseWholesaleButton from "@components/ui/close-wholesale-session";
export default async function Home() {
  const sortedByGroup = Object.groupBy(mock, (prod) => prod.category);
  const arrayGrouped = Object.entries(sortedByGroup).map(
    ([category, products]) => ({ category, products })
  );
  const hasWholesale = await isWholesale();

  return (
    <section className="flex flex-col gap-4 ">
      {hasWholesale && (
        <div className="p-2 rounded-md bg-brand-1/20 border-2 mt-4 border-brand-1 text-brand-1 flex flex-col sm:flex-row items-center justify-center gap-5">
          <p className="flex items-center gap-1 text-xl">
            ¡Bienvenido mayorista! <IconShoppingCartDiscount />
          </p>

          <CloseWholesaleButton />
        </div>
      )}
      <CarouselAuto />

      <NewIncomes products={mock} limit={15} isWholesale={hasWholesale} />

      {arrayGrouped.map(({ category, products }) => (
        <article key={category}>
          <h3 className="font-bold text-2xl text-brand-1 underline-offset-2 underline">
            {category}
          </h3>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 max-w-[800px] mx-auto gap-3 px-2 py-3 place-items-center">
            {products?.map((prod) => (
              <ProductCard
                prod={prod}
                key={prod._id}
                isWholesale={hasWholesale}
              />
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
