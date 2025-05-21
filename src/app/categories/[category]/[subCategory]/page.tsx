import { isAdmin } from "@actions/cookies";
import { getByCategory } from "@actions/products";
import ProductCard from "@components/shared/product-card";
import AsideCategoriesMenu from "@components/ui/aside-categories-menu";
import Link from "next/link";

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ subCategory: string; category: string }>;
}) {
  const { subCategory, category } = await params;
  const admin = await isAdmin();
  const { products } = await getByCategory(category);

  const decodedCategory = decodeURIComponent(category);
  const decodedSubcategory = decodeURIComponent(subCategory);

  if (!products) return false;

  const filteredBySubcategory = products.filter((item) =>
    item.sub_category
      .toLowerCase()
      .includes(decodedSubcategory.toLocaleLowerCase())
  );
  return (
    <section className="p-2 flex flex-col">
      <div className="flex md:flex-row flex-col justify-between items-center w-full">
        <div className="uppercase my-4">
          <Link
            href="/"
            className="text-black/60 hover:text-black transition-colors"
          >
            Inicio
          </Link>{" "}
          /{" "}
          <Link
            href={`/categories/${category}`}
            className="text-black/60 hover:text-black transition-colors"
          >
            {decodedCategory}
          </Link>{" "}
          / <strong>{decodedSubcategory}</strong>
        </div>

        <p className="text-brand-1 font-semibold">
          Mostrando {filteredBySubcategory.length} resultados.
        </p>
      </div>

      <div className="flex">
        <div className="hidden md:block w-fit">
          <AsideCategoriesMenu />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-2">
          {filteredBySubcategory.map((prod) => (
            <ProductCard prod={prod} key={prod._id} isAdmin={admin} />
          ))}
        </div>
      </div>
    </section>
  );
}
