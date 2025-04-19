"use client";

import { PHONE_NUMBER } from "@constants";
import { useCartStore } from "@store/cart";
import createMsg from "@utils/msg";
import Image from "next/image";
import Link from "next/link";
import defaultAsset from "@assets/default.png";

export default function Cart() {
  const { cart, getTotal } = useCartStore();
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-center gap-3">
        <strong>
          <span className="text-brand-1 text-xl">{cart.length}</span> productos.
        </strong>

        <p className="text-xl text-brand-1">${getTotal()}</p>
        <a
          href={`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${createMsg(
            cart,
            { encodeMsg: true }
          )}`}
          className="py-2 px-4 rounded-md bg-green-500 text-white"
        >
          Enviar pedido
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {cart.map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="max-w-[230px] w-full p-2 rounded-md shadow-md shadow-black/50 flex flex-col flex-shrink-0 justify-between"
          >
            <Image src={defaultAsset} alt="" />
            <strong>{product.title}</strong>

            <div className="flex items-center gap-1">
              <strong className="text-xl text-green-500">
                ${product.retail_price}
              </strong>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
