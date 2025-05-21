import { isAdmin } from "@actions/cookies";
import { getByCategory } from "@actions/products";
import ProductCard from "@components/shared/product-card";
import AsideCategoriesMenu from "@components/ui/aside-categories-menu";
import Link from "next/link";
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const decodedCategory = decodeURIComponent(category);

  const { products } = await getByCategory(category);

  const hasAdmin = await isAdmin();
  return (
    <section className="p-2 flex flex-col">
      <div className="flex w-full md:flex-row flex-col justify-between items-center">
        <div className="uppercase my-4">
          <Link
            href="/"
            className="text-black/60 hover:text-black transition-colors"
          >
            Inicio
          </Link>{" "}
          / <strong>{decodedCategory}</strong>
        </div>
        <p className="text-brand-1 font-semibold">
          Mostrando {products?.length} resultados.
        </p>
      </div>

      <div className="flex">
        <div className="hidden md:block w-fit">
          <AsideCategoriesMenu />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-2">
          {products?.map((prod) => (
            <ProductCard prod={prod} key={prod._id} isAdmin={hasAdmin} />
          ))}
        </div>
      </div>
    </section>
  );
}
