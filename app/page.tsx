import mock from "@mock.json";
import Image from "next/image";
import defaultAsset from "@assets/default.png";
import Link from "next/link";
import CarouselAuto from "@components/ui/carousel-auto";
export default function Home() {
  return (
    <section>
      <CarouselAuto />

      <p className="text-center text-xl text-white bg-black/70 p-2 font-bold">
        NUEVOS INGRESOS
      </p>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 max-w-[800px] mx-auto gap-3 px-2 py-3">
        {mock.map((prod) => (
          <Link
            href={`/product/${prod._id}`}
            key={prod._id}
            className="max-w-[200px] p-2 rounded-md shadow-md shadow-black/50 flex flex-col justify-between"
          >
            <Image src={defaultAsset} alt="" />
            <strong>{prod.title}</strong>

            <div className="flex items-center gap-1 ">
              <strong className="text-xl text-green-500">
                ${prod.retail_price}
              </strong>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
