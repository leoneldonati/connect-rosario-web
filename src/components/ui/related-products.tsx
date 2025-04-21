import { getByCategory } from "@actions/products";
import ProductsCarousel from "./products-carousel";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { isAdmin, isWholesale } from "@actions/cookies";

interface Props {
  category: string;
}
export default function RelatedProducts({ category }: Props) {
  const productsPromise = getByCategory(category);
  const admin = isAdmin();
  const wholesale = isWholesale();
  return (
    <section className="w-full border border-brand-1 p-3 rounded-md">
      <h3 className="text-2xl font-bold text-brand-1">
        Productos Relacionados
      </h3>

      <Suspense fallback={<Skeleton />}>
        <ProductsCarousel
          promise={productsPromise}
          isAdmin={admin}
          isWholesale={wholesale}
        />
      </Suspense>
    </section>
  );
}
