import { getById } from "@actions/products";
import ProductForm from "@components/ui/product-form";
import { IconFilePencil } from "@tabler/icons-react";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { product } = await getById(id);

  return (
    <section className="flex flex-col items-center gap-5">
      <h3 className="text-2xl text-brand-1 animate-flip-up flex items-center gap-1 underline">
        Edita un producto <IconFilePencil />
      </h3>

      <ProductForm payload={product ?? undefined} />
    </section>
  );
}
