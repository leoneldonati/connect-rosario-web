import CarouselAuto from "@components/ui/carousel-auto";
import NewIncomes from "@components/ui/new-incomes";
import { isWholesale, isAdmin as checkAdmin } from "@actions/cookies";
import {
  IconPlus,
  IconSettingsCheck,
  IconShoppingCartDiscount,
} from "@tabler/icons-react";
import CloseWholesaleButton from "@components/ui/close-wholesale-session";
import CloseAdminButton from "@components/ui/close-admin-session";
import Link from "next/link";
import ProductsFeed from "@components/ui/products-feed";
import ProductsCounter from "@components/admin/products-counter";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
export default async function Home() {
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
              <ProductsCounter />
              productos
            </p>

            <Link
              href="/product/add"
              className="bg-brand-1/20 p-2 rounded text-brand-1 flex items-center gap-1"
              title="Añade un producto"
            >
              <IconPlus /> Añadir un producto
            </Link>
          </div>
        </div>
      )}
      {!isAdmin && <CarouselAuto />}

      {!isAdmin && <NewIncomes limit={15} isAdmin={isAdmin} />}

      <Suspense fallback={<Skeleton />}>
        <ProductsFeed isAdmin={isAdmin} />
      </Suspense>
    </section>
  );
}
