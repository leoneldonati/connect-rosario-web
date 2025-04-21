"use server";

import { productsModel } from "@db";
import { uploadFile } from "@libs/cld";
import { convertFile } from "@libs/sharp";
import { productSchema } from "@libs/zod";

export async function insertOne(formState: unknown, formData: FormData) {
  const { title, image, category, retail_price, wholesale_price, description } =
    Object.fromEntries(formData);

  const file = image as File;
  const arrayBuffer = await file.arrayBuffer();

  // VALIDAR LOS CAMPOS
  try {
    productSchema.parse({
      title,
      category,
      retail_price: Number(retail_price),
      wholesale_price: Number(wholesale_price),
      description,
    });
  } catch (e) {
    if (e instanceof Error) {
      const issues = JSON.parse(e.message);

      return {
        error: true,
        message: "Error en la validación de los campos.",
        issues,
      };
    }
  }
  if (arrayBuffer.byteLength === 0)
    return {
      error: true,
      message: "Debes seleccionar una fotoproducto",
    };
  // OPTIMIZAR Y SUBIR ARCHIVOS
  const { buffer: convertedBuffer } = await convertFile(arrayBuffer, {
    format: "avif",
  });

  if (!convertedBuffer)
    return {
      error: true,
      message: "Error al intentar optimizar el archivo",
    };
  const { uploadedAsset } = await uploadFile(convertedBuffer, file.type);

  if (!uploadedAsset)
    return {
      error: true,
      message: "Error al intentar subir el archivo optimizado",
    };

  const newProduct: ProductWithoutId = {
    title: title.toString(),
    category: category.toString(),
    image_url: uploadedAsset.secureUrl,
    created_at: new Date(),
    wholesale_price: Number(wholesale_price),
    retail_price: Number(retail_price),
    description: description.toString(),
    extra_info: "",
    in_stock: true,
  };

  const { insertedId } = await productsModel.insertOne(newProduct);

  return {
    error: false,
    message: `¡${title} añadido!`,
    insertedProduct: {
      ...newProduct,
      _id: insertedId.toString(),
    } as Product,
  };
}
