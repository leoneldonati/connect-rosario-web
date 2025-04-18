import mock from "@mock.json";
import Image from "next/image";
import logo from "@assets/default.png";
import BrandWspWhite from "@assets/svg/brand-whatsapp-white.svg";
import AddCartButton from "@components/ui/add-cart-button";
import { PHONE_NUMBER } from "@constants";
import RelatedProducts from "@components/ui/related-products";
import ImageScalable from "@components/ui/image-scalable";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = mock.find((prod) => prod._id === id);
  // const product = await getProductById(id).catch((err) => console.log(err));

  const message = `
  Hola Connect Rosario! 🌐 Quiero realizar el siguiente pedido: \n
  *${product?.title} : $${product?.retail_price}*
  `;
  return (
    <section className="flex flex-col gap-4 p-2">
      <div className="w-full flex md:flex-row flex-col gap-4 items-center px-2">
        <ImageScalable image={logo} />

        <div className="w-full flex flex-col gap-4">
          <p className="text-2xl font-bold text-balance">{product?.title}</p>

          <strong className="text-4xl text-green-500">
            ${product?.retail_price}
          </strong>
          <div className="flex flex-col gap-2 w-full">
            <AddCartButton product={product!} />
            <a
              href={`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(
                message
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-bold px-4 py-2 rounded-md flex items-center justify-center gap-1"
            >
              <Image src={BrandWspWhite} alt="" /> Pedir por WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border border-black/40 rounded-md p-4 w-full flex flex-col gap-4">
        <p className="text-xl underline">Descripción</p>

        <strong>{product?.description}</strong>

        <span className="text-xl underline ">Información extra</span>

        <p>{product?.extra_info}</p>
      </div>

      <RelatedProducts
        productId={product?._id ?? ""}
        category={product?.category ?? ""}
      />
    </section>
  );
}
