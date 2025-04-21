import { isAdmin } from "@actions/cookies";
import ProductForm from "@components/ui/product-form";
import { IconFilePlus } from "@tabler/icons-react";
import { redirect } from "next/navigation";

export default async function AddProductPage() {
  if (!(await isAdmin())) return redirect("/");
  return (
    <section className="flex flex-col items-center gap-5">
      <h3 className="text-2xl text-brand-1 animate-flip-up flex items-center gap-1 underline">
        Añade un producto <IconFilePlus />
      </h3>

      <ProductForm />
    </section>
  );
}
