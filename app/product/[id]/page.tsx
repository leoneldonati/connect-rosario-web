import mock from "@mock.json";
import Image from "next/image";
import logo from "@assets/default.png";
import CartSvg from "@assets/svg/shopping-cart.svg";
import BrandWspWhite from "@assets/svg/brand-whatsapp-white.svg";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = mock.find((prod) => prod._id === id);
  // const product = await getProductById(id).catch((err) => console.log(err));
  return (
    <section className="flex flex-col md:flex-row pb-2">
      <Image src={logo} alt="" className="max-w-[400px]" />
      <div className="w-full flex flex-col gap-4 md:gap-0 md:items-start items-center px-2">
        <p className="text-2xl font-bold text-balance">{product?.title}</p>

        <div className="flex flex-col gap-2 ">
          <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md flex items-center justify-center gap-1">
            <Image src={CartSvg} alt="" /> Añadir al carro
          </button>

          <a
            href=""
            className="bg-green-500 text-white font-bold px-4 py-2 rounded-md flex items-center justify-center gap-1"
          >
            <Image src={BrandWspWhite} alt="" /> Pedir por WhatsApp
          </a>
        </div>

        <div className="border-2 border-black rounded-md p-4 w-full flex flex-col gap-4 items-center">
          <strong className="text-xl bg-black text-white p-2 rounded">
            Descripción
          </strong>

          <p>{product?.description}</p>

          <i className="text-xl text-black/60 underline w-full items-start">
            Información extra
          </i>

          <p>{product?.extra_info}</p>
        </div>
      </div>
    </section>
  );
}
