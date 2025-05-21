"use client";
import Image from "next/image";
import { IconPencil } from "@tabler/icons-react";
import DeleteProductButton from "@components/ui/delete-product-button";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  prod: Product;
  isAdmin: boolean;
}
export default function ProductCard({ prod, isAdmin }: Props) {
  return (
    <Link
      href={`/product/${prod._id}`}
      title={`Ver ${prod.title}`}
      className="max-w-[230px] w-full h-full p-2 rounded-md  flex flex-col gap-3 flex-shrink-0 bg-white"
      onClick={(e) => {
        if (isAdmin) {
          e.preventDefault();
        }
      }}
    >
      {isAdmin && (
        <div className="flex gap-2">
          <button
            onClick={() => {
              redirect(`/product/edit/${prod._id}`);
            }}
            title={`Editar ${prod.title}`}
            className="text-brand-1 flex justify-center p-2 rounded-full hover:bg-brand-1 hover:text-white transition-colors"
          >
            <IconPencil />
          </button>
          <DeleteProductButton
            id={prod._id}
            publicId={prod.image?.publicId ?? ""}
            title={prod.title}
          />
        </div>
      )}

      <Image
        src={prod.image?.secureUrl ?? ""}
        width={1920}
        height={1080}
        alt={prod.title}
        className="aspect-square object-center object-contain outline-1 outline-neutral-200"
      />
      <p className="text-sm font-semibold transition-colors hover:text-orange-400">
        {prod.title}
      </p>
    </Link>
  );
}
