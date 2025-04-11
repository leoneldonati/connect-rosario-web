import mock from "@mock.json";

export default function RelatedProducts({ category }: { category: string }) {
  const relatedProducts = mock.filter(
    (product) => product.category === category
  );

  return (
    <section>
      <h3>Productos Relacionados</h3>
      {relatedProducts.length > 0 ? (
        <ul>
          {relatedProducts.map((product) => (
            <li key={product._id}>{product.title}</li>
          ))}
        </ul>
      ) : (
        <p>No hay productos relacionados en esta categoría.</p>
      )}
    </section>
  );
}
