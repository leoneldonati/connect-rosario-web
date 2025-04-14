import Link from "next/link";
import defaultAsset from "@assets/default.png";
import Image from "next/image";

export default function ProductCard({ prod }: { prod: Product }) {
  return (
    <Link
      href={`/product/${prod._id}`}
      key={prod._id}
      className="max-w-[200px] w-full p-2 rounded-md shadow-md shadow-black/50 flex flex-col flex-shrink-0 justify-between"
    >
      <Image src={defaultAsset} alt="" />
      <strong>{prod.title}</strong>

      <div className="flex items-center gap-1">
        <strong className="text-xl text-green-500">${prod.retail_price}</strong>
      </div>
    </Link>
  );
}
