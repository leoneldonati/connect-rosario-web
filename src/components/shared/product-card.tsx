"use client";
import Link from "next/link";
import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";
import { IconPencil } from "@tabler/icons-react";
import DeleteProductButton from "@components/ui/delete-product-button";

interface Props {
  prod: Product;
  isAdmin: boolean;
  isWholesale: boolean;
}
export default function ProductCard({ prod, isAdmin, isWholesale }: Props) {
  const price = isWholesale ? prod.wholesale_price : prod.retail_price;
  return (
    <Link
      href={`/product/${prod._id}`}
      key={prod._id}
      className="max-w-[230px] w-full p-2 rounded-md shadow-md shadow-black/50 flex flex-col flex-shrink-0 justify-between"
    >
      {isAdmin && (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Link href={`/product/edit/${prod._id}`} className="text-brand-1">
            <IconPencil />
          </Link>
          <DeleteProductButton id={prod._id} />
        </div>
      )}

      <ViewTransition name={`image-${prod._id}`}>
        <Image
          src={prod.image?.secureUrl ?? ""}
          width={1920}
          height={1080}
          alt={prod.title}
        />
      </ViewTransition>
      <strong className="whitespace-nowrap overflow-hidden text-ellipsis">
        {prod.title}
      </strong>

      <div className="flex items-center gap-1">
        <strong className="text-xl text-green-500">${price}</strong>
        {isWholesale ||
          (isAdmin && (
            <small className="text-black/60 line-through italic">
              ${prod.retail_price}
            </small>
          ))}
      </div>
    </Link>
  );
}
