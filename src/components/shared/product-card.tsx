"use client";
import Link from "next/link";
import defaultAsset from "@assets/default.png";
import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";
export default function ProductCard({
  prod,
  isWholesale,
}: {
  prod: Product;
  isWholesale: boolean;
}) {
  const price = isWholesale ? prod.wholesale_price : prod.retail_price;
  return (
    <Link
      href={`/product/${prod._id}`}
      key={prod._id}
      className="max-w-[230px] w-full p-2 rounded-md shadow-md shadow-black/50 flex flex-col flex-shrink-0 justify-between"
    >
      <ViewTransition name={`image-${prod._id}`}>
        <Image src={defaultAsset} alt="" />
      </ViewTransition>
      <strong className="whitespace-nowrap overflow-hidden text-ellipsis">
        {prod.title}
      </strong>

      <div className="flex items-center gap-1">
        <strong className="text-xl text-green-500">${price}</strong>
        {isWholesale && (
          <small className="text-black/60 line-through italic">
            ${prod.retail_price}
          </small>
        )}
      </div>
    </Link>
  );
}
