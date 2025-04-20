import ProductCard from "../shared/product-card";
import mock from "@mock.json";

export default function RelatedProducts({
  category,
  productId,
}: {
  category: string;
  productId: string;
}) {
  const relatedProducts = mock.filter(
    (product) => product.category === category
  );

  return (
    <section className="w-full border border-brand-1 p-3 rounded-md">
      <h3 className="text-2xl font-bold text-brand-1">
        Productos Relacionados
      </h3>
      {relatedProducts.length > 0 ? (
        <ul className="flex gap-3 overflow-y-hidden overflow-x-auto w-full p-2">
          {relatedProducts.map((product) =>
            product._id === productId ? (
              false
            ) : (
              <ProductCard prod={product} key={product._id} />
            )
          )}
        </ul>
      ) : (
        <p>No hay productos relacionados en esta categoría.</p>
      )}
    </section>
  );
}
