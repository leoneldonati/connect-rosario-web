import CarouselAuto from "../components/ui/carousel-auto";
import ProductCard from "../components/shared/product-card";
import NewIncomes from "../components/ui/new-incomes";
import { isWholesale, isAdmin as checkAdmin } from "@actions/cookies";
import {
  IconPlus,
  IconSettingsCheck,
  IconShoppingCartDiscount,
} from "@tabler/icons-react";
import CloseWholesaleButton from "@components/ui/close-wholesale-session";
import CloseAdminButton from "@components/ui/close-admin-session";
import Link from "next/link";
import { getAll } from "@actions/products";
export default async function Home() {
  const { products } = await getAll();
  const sortedByGroup = Object.groupBy(products ?? [], (prod) => prod.category);
  const arrayGrouped = Object.entries(sortedByGroup).map(
    ([category, products]) => ({ category, products })
  );
  const hasWholesale = await isWholesale();
  const isAdmin = await checkAdmin();

  return (
    <section className="flex flex-col gap-4 ">
      {/* MODO MAYORISTA */}
      {hasWholesale && (
        <div className="p-2 rounded-md bg-brand-1/20 border-2 mt-4 border-brand-1 text-brand-1 flex flex-col sm:flex-row items-center justify-center gap-5">
          <p className="flex items-center gap-1 text-xl">
            ¡Bienvenido mayorista! <IconShoppingCartDiscount />
          </p>

          <CloseWholesaleButton />
        </div>
      )}

      {/* MODO ADMINISTRADOR */}
      {isAdmin && (
        <div className="p-2 rounded-md  border-2 mt-4 border-brand-1 text-brand-1  flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <p className="flex items-center gap-1 text-xl">
              ¡Bienvenido Nicolás! <IconSettingsCheck />
            </p>

            <CloseAdminButton />
          </div>

          <div className="flex  justify-between">
            <p className="flex items-center gap-1">
              <strong>{products?.length}</strong>
              productos
            </p>

            <Link
              href="/product/add"
              className="bg-brand-1/20 p-2 rounded text-brand-1 flex items-center gap-1"
            >
              <IconPlus /> Añadir un producto
            </Link>
          </div>
        </div>
      )}
      {!isAdmin && <CarouselAuto />}

      {!isAdmin && (
        <NewIncomes
          products={products ?? []}
          limit={15}
          isWholesale={hasWholesale}
        />
      )}

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
                isAdmin={isAdmin}
                isWholesale={hasWholesale}
              />
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
