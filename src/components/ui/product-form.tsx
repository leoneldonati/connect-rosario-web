"use client";

import { insertOne } from "@actions/products";
import { useProductStore } from "@store/products";
import { IconCamera, IconLoader3, IconTrashFilled } from "@tabler/icons-react";
import Image from "next/image";
import { type ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  payload?: Product;
}
export default function ProductForm({ payload }: Props) {
  const { addOne } = useProductStore();
  // ARCHIVO A SUBIR
  const [temporalUrl, setTemporalUrl] = useState(
    payload?.image?.secureUrl ?? ""
  );
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const file = files.item(0);

    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    setTemporalUrl(objectUrl);
  };
  useEffect(() => {
    if (temporalUrl) return () => URL.revokeObjectURL(temporalUrl);
  }, [temporalUrl]);

  // ESTADO DE LA ACCION
  const [state, action, pending] = useActionState(insertOne, undefined);
  useEffect(() => {
    if (state && state.error) {
      toast.error(state.message);
      setTemporalUrl("");
    }
    if (state && !state.error && state.insertedProduct) {
      toast.success(state.message);
      addOne(state.insertedProduct);
    }
  }, [state]);
  return (
    <form
      action={action}
      className="max-w-[400px] w-full p-2 rounded  flex flex-col gap-2"
    >
      {payload?._id && <input hidden defaultValue={payload?._id} name="_id" />}
      <label
        htmlFor="image"
        className=" cursor-pointer grid place-items-center aspect-video bg-brand-1/20 rounded max-w-full overflow-hidden shadow shadow-brand-1 relative"
      >
        {temporalUrl && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setTemporalUrl("");
            }}
            className="text-white absolute top-2 right-2 z-10 bg-brand-1 p-1 rounded-full"
          >
            <IconTrashFilled />
          </button>
        )}
        <input
          onClick={(e) => e.stopPropagation()}
          onChange={handleChangeInput}
          type="file"
          id="image"
          hidden
          accept="image/*"
          name="image"
          aria-label="Sube una foto del producto"
        />

        {payload?.image && (
          <input
            defaultValue={JSON.stringify(payload?.image)}
            hidden
            name="default_image"
          />
        )}
        {!temporalUrl && (
          <IconCamera className="text-brand-1 size-12 animate-pulse" />
        )}
        {temporalUrl && (
          <Image
            src={temporalUrl}
            alt="Imagen a subir"
            width={1920}
            height={1080}
            className="aspect-video object-contain"
          />
        )}
      </label>

      <label htmlFor="title" className="flex flex-col text-brand-1">
        Título
        <input
          type="text"
          placeholder="Ingresa el título del producto"
          defaultValue={payload?.title}
          id="title"
          name="title"
          className="p-2 outline outline-brand-1 rounded"
          required
        />
      </label>
      <div className="w-full flex gap-2">
        <label htmlFor="retail_price" className="flex flex-col text-brand-1">
          Precio minorista
          <input
            type="number"
            placeholder="Ingresa precio minorista $"
            defaultValue={payload?.retail_price}
            id="retail_price"
            name="retail_price"
            min={0}
            step={0}
            className="p-2 outline outline-brand-1 rounded"
            required
          />
        </label>
        <label htmlFor="wholesale_price" className="flex flex-col text-brand-1">
          Precio mayorista
          <input
            type="number"
            placeholder="Ingresa precio mayorista $"
            id="wholesale_price"
            name="wholesale_price"
            defaultValue={payload?.wholesale_price}
            min={0}
            step={0}
            className="p-2 outline outline-brand-1 rounded"
            required
          />
        </label>
      </div>

      <label htmlFor="category" className="flex flex-col text-brand-1">
        Categoría
        <input
          type="text"
          placeholder="Ingresa la categoría del producto"
          id="category"
          name="category"
          className="p-2 outline outline-brand-1 rounded"
          defaultValue={payload?.category}
          required
        />
      </label>

      <label htmlFor="sub_category" className="flex flex-col text-brand-1">
        Sub Categoría
        <input
          type="text"
          placeholder="Ingresa la subcategoria del producto"
          id="sub_category"
          name="sub_category"
          className="p-2 outline outline-brand-1 rounded"
          defaultValue={payload?.sub_category}
          required
        />
      </label>
      <label htmlFor="description" className="flex flex-col text-brand-1">
        Descripción
        <textarea
          className="p-2 outline outline-brand-1 rounded resize-none min-h-40 h-full"
          defaultValue={payload?.description}
          id="description"
          name="description"
          placeholder="Aquí describe tu producto..."
          required
        ></textarea>
      </label>

      <button
        disabled={pending}
        className="bg-brand-1/20 px-4 py-2 rounded-md text-brand-1 font-bold flex items-center gap-1 justify-center"
      >
        {pending ? "Guardando..." : "Guardar"}{" "}
        <IconLoader3 className={`${!pending && "hidden"} animate-spin`} />
      </button>
    </form>
  );
}
