"use client";
import Image from "next/image";
import { IconPencil } from "@tabler/icons-react";
import DeleteProductButton from "@components/ui/delete-product-button";
import Link from "next/link";

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
      title={`Ver ${prod.title}`}
      className="max-w-[230px] w-full h-full p-2 rounded-md shadow-md shadow-black/50 flex flex-col flex-shrink-0 justify-between bg-white"
    >
      {isAdmin && (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Link
            href={`/product/edit/${prod._id}`}
            title={`Editar ${prod.title}`}
            className="text-brand-1"
          >
            <IconPencil />
          </Link>
          <DeleteProductButton
            id={prod._id}
            publicId={prod.image?.publicId ?? ""}
          />
        </div>
      )}

      <Image
        src={prod.image?.secureUrl ?? ""}
        width={1920}
        height={1080}
        alt={prod.title}
        className="aspect-square object-center object-contain shadow shadow-black/60 rounded-md"
      />
      <p className="whitespace-nowrap overflow-hidden text-ellipsis">
        {prod.title}
      </p>

      <div className="flex items-center gap-1">
        <strong className="text-xl text-brand-1">
          ${price.toLocaleString("es-ar", { currency: "ARS" })}
        </strong>
        {isWholesale ||
          (isAdmin && (
            <small className="text-black/60 line-through italic">
              ${prod.retail_price.toLocaleString("es-ar", { currency: "ARS" })}
            </small>
          ))}
      </div>
    </Link>
  );
}
