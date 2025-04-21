"use client";

import { PHONE_NUMBER } from "@constants";
import { useCartStore } from "@store/cart";
import createMsg from "@utils/msg";
import ProductCard from "@components/shared/product-card";
import { IconTrashFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { isAdmin, isWholesale } from "@actions/cookies";

export default function Cart() {
  const { list, getLength, getTotal, quiteOne } = useCartStore();
  const [wholesale, setWholesale] = useState(false);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    isWholesale().then((value) => setWholesale(value));
    isAdmin().then((value) => setAdmin(value));
  }, []);
  return (
    <section className="flex flex-col gap-5 py-4">
      <div className="flex sm:flex-row flex-col items-center justify-center gap-3">
        <strong>
          <span className="text-brand-1 text-xl">{getLength()}</span> productos.
        </strong>

        <p className="text-xl text-brand-1">${getTotal(wholesale)}</p>
        <a
          hidden={getLength() === 0}
          href={`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${createMsg(
            list,
            { encodeMsg: true, isWholesale: wholesale }
          )}`}
          className="py-2 px-4 rounded-md bg-green-500 text-white"
        >
          Enviar pedido
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-2">
        {list.map((product) => (
          <div
            key={product._id}
            className="flex flex-col gap-2 rounded-md shadow shadow-brand-1 p-2"
          >
            <button
              onClick={() => quiteOne(product._id)}
              className="text-red-500"
            >
              <IconTrashFilled />
            </button>
            <ProductCard
              prod={product}
              isWholesale={wholesale}
              isAdmin={admin}
            />
            <strong>Cantidad: {product.quantity}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
