"use client";
import { useCartStore } from "../../store/cart";
import { IconMinus, IconPlus } from "@tabler/icons-react";
interface Props {
  prodId: string;
}
export default function Counter({ prodId }: Props) {
  const { getProductCount, action } = useCartStore();

  const handleSum = () => action(prodId, (q) => q + 1);
  const handleQuite = () => action(prodId, (q) => (q === 0 ? 0 : q - 1));
  return (
    <div className="flex flex-col  gap-2 items-center outline outline-brand-1 p-2 w-full">
      <span className="text-xl">{getProductCount(prodId)}</span>

      <div className="flex items-center gap-2 ">
        <button onClick={handleQuite} className="bg-brand-1 text-white rounded">
          <IconMinus />
        </button>
        <button onClick={handleSum} className="bg-brand-1 text-white rounded">
          <IconPlus />
        </button>
      </div>
    </div>
  );
}
