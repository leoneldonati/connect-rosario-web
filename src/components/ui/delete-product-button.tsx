"use client";

import { deleteOne } from "@actions/products";
import { IconLoader3, IconTrashFilled } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

interface Props {
  id: string;
  publicId: string;
}
export default function DeleteProductButton({ id, publicId }: Props) {
  const [state, action, pending] = useActionState(deleteOne, undefined);

  useEffect(() => {
    if (state) {
      redirect("/");
    }
  }, [state]);
  return (
    <form action={() => action({ id, publicId })}>
      <button>
        {pending ? (
          <IconLoader3 className="animate-spin text-red-500" />
        ) : (
          <IconTrashFilled className="text-red-500" />
        )}
      </button>
    </form>
  );
}
