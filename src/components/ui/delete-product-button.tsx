"use client";

import { deleteOne } from "@actions/products";
import { useProductStore } from "@store/products";
import { IconLoader3, IconTrashFilled } from "@tabler/icons-react";
import { useActionState, useEffect } from "react";

interface Props {
  id: string;
  publicId: string;
  title: string;
}
export default function DeleteProductButton({ id, publicId, title }: Props) {
  const [state, action, pending] = useActionState(deleteOne, undefined);
  const { deleteOne: deleteFromStore } = useProductStore();
  useEffect(() => {
    if (!state?.error) {
      deleteFromStore(id);
    }
  }, [state]);
  return (
    <form action={() => action({ id, publicId })}>
      <button
        title={`Borrar ${title}`}
        className="flex justify-center p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
      >
        {pending ? <IconLoader3 /> : <IconTrashFilled />}
      </button>
    </form>
  );
}
