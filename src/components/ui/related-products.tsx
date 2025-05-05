import { getByCategory } from "@actions/products";
import { isAdmin, isWholesale } from "@actions/cookies";
import ProductsCarousel from "./products-carousel";

interface Props {
  category: string;
}
export default async function RelatedProducts({ category }: Props) {
  const productsPromise = await getByCategory(category);
  const admin = await isAdmin();
  const wholesale = await isWholesale();
  return (
    <section className="w-full  p-3 rounded-md bg-brand-1">
      <h3 className="text-2xl font-bold text-white">Productos Relacionados</h3>

      <ProductsCarousel
        isAdmin={admin}
        isWholesale={wholesale}
        products={productsPromise.products ?? []}
      />
    </section>
  );
}
