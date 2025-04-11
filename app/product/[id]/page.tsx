import mock from "@mock.json";
import Image from "next/image";
import logo from "@assets/default.png";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = mock.find((prod) => prod._id === Number(id));
  // const product = await getProductById(id).catch((err) => console.log(err));
  return (
    <section>
      <article className="flex">
        <Image src={logo} alt="" className="max-w-[400px]" />
        <div className="w-full">
          <p className="text-2xl font-bold text-balance">{product?.title}</p>

          <div className="flex flex-col gap-2 [&>a]:px4 [&>a]:py-2 [&>a]:rounded-md">
            <a href="">Añadir al carro</a>

            <a href="">Pedir por WhatsApp</a>
          </div>
        </div>
      </article>
    </section>
  );
}
