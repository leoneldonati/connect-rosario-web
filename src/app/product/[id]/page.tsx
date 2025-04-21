import AddCartButton from "@components/ui/add-cart-button";
import { PHONE_NUMBER } from "@constants";
import RelatedProducts from "@components/ui/related-products";
import ImageScalable from "@components/ui/image-scalable";
import { unstable_ViewTransition as ViewTransition } from "react";
import { isWholesale } from "@actions/cookies";
import Counter from "@components/ui/counter";
import type { Metadata } from "next";
import { IconBrandWhatsappFilled } from "@tabler/icons-react";
import ShareButtons from "@components/ui/share-prod-buttons";
import { getById } from "@actions/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { product } = await getById(id);

  if (!product) {
    return {
      title: "Producto no encontrado - Connect Rosario",
      description:
        "Explora nuestra tienda de productos electrónicos en Connect Rosario.",
    };
  }

  return {
    title: `${product.title} - Connect Rosario`,
    description: `Compra ${product.title} por $${
      product.retail_price
    } en Connect Rosario. ${product.description.slice(
      0,
      100
    )}... ¡Ofertas exclusivas!`,
    authors: [{ name: "Leonel Donati", url: "https://leodonati.site" }],
    openGraph: {
      title: `${product.title} - Connect Rosario`,
      description: `Compra ${product.title} por $${
        product.retail_price
      } en Connect Rosario. ${product.description.slice(0, 100)}...`,
      url: `https://www.connectrosario.com/products/${product._id}`,
      siteName: "Connect Rosario",
      images: [
        {
          url: product.image?.secureUrl || "",
          width: 1200,
          height: 630,
          alt: `Imagen de ${product.title}`,
        },
      ],
      locale: "es_AR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - Connect Rosario`,
      description: `Compra ${product.title} por $${
        product.retail_price
      } en Connect Rosario. ${product.description.slice(0, 100)}...`,
      images: [product.image?.secureUrl || ""],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { product } = await getById(id);
  const hasWholesale = await isWholesale();
  const price = hasWholesale ? product?.wholesale_price : product?.retail_price;

  const message = `
  Hola Connect Rosario! 🌐 Quiero realizar el siguiente pedido: \n
  *${product?.title} : $${product?.retail_price}*
  `;
  return (
    <section className="flex flex-col gap-4 p-2 max-w-lg w-full mx-auto md:max-w-full md:mx-0">
      <div className="w-full flex md:flex-row flex-col gap-4 items-center px-2">
        <ViewTransition name={`image-${product?._id}`}>
          <ImageScalable image={product?.image?.secureUrl ?? ""} />
        </ViewTransition>

        <div className="w-full flex flex-col gap-4">
          <p className="text-2xl font-bold text-balance">{product?.title}</p>

          <strong className="text-4xl text-green-500">${price}</strong>
          <div className="flex flex-col gap-2 w-full">
            <Counter prodId={product?._id ?? ""} />
            <AddCartButton product={product!} />
            <a
              href={`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(
                message
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-bold px-4 py-2 rounded-md flex items-center justify-center gap-1"
            >
              <IconBrandWhatsappFilled /> Pedir por WhatsApp
            </a>
          </div>

          <ShareButtons product={product!} />
        </div>
      </div>
      <div className="border border-black/40 rounded-md p-4 w-full flex flex-col gap-4">
        <p className="text-xl underline">Descripción</p>

        <strong>{product?.description}</strong>

        <span className="text-xl underline ">Información extra</span>

        <p>{product?.extra_info}</p>
      </div>

      <RelatedProducts category={product?.category ?? ""} />
    </section>
  );
}
