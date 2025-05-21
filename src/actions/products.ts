"use server";

import { productsModel } from "@db";
import { deleteFile, uploadFile } from "@libs/cld";
import { convertFile } from "@libs/sharp";
import { productSchema } from "@libs/zod";
import { ObjectId } from "mongodb";

// OBTENER TODOS
export async function getAll(limit = 100) {
  try {
    const products = await productsModel.find({}).limit(limit).toArray();

    return {
      error: false,
      products: products.map((prod) => ({
        ...prod,
        _id: prod._id.toString(),
      })) as Product[],
    };
  } catch {
    return {
      error: true,
      products: null,
    };
  }
}
// OBTENER POR _id
export async function getById(_id: string) {
  try {
    const product = await productsModel.findOne({ _id: new ObjectId(_id) });
    if (!product) return { error: true, product: null };

    return {
      error: false,
      product: {
        ...product,
        _id: product._id.toString(),
      } as unknown as Product,
    };
  } catch {
    return { error: true, product: null };
  }
}
// OBTENER POR CATEGORIA
export async function getByCategory(category: string) {
  try {
    const relatedProducts = await productsModel.find({ category }).toArray();

    return {
      error: false,
      products: relatedProducts.map((prod) => ({
        ...prod,
        _id: prod._id.toString(),
      })) as Product[],
    };
  } catch {
    return {
      error: true,
      products: null,
    };
  }
}
// OBTENER CATEGORIAS CON SUBCATEGORIAS
export async function getAvaliblesCategories() {
  try {
    const products = await productsModel.find({}).toArray();
    const groupedByCategory = Object.groupBy(products, (item) => item.category);
    const avalibleCategories = Object.entries(groupedByCategory).map(
      ([category, prod]) => ({
        category,
        subCategories: [...new Set(prod?.map((p) => p.sub_category))],
      })
    );

    return {
      error: false,
      avalibleCategories,
    };
  } catch {
    return {
      error: true,
      avalibleCategories: null,
    };
  }
}
// AGREGAR UNO
export async function insertOne(formState: unknown, formData: FormData) {
  const {
    title,
    image,
    category,
    retail_price,
    wholesale_price,
    description,
    sub_category,
  } = Object.fromEntries(formData);

  // CAMPOS POR DEFECTO
  const _id = formData.get("_id");
  const default_image = formData.get("default_image");

  // IMAGEN A SUBIR
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
      sub_category,
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

  if (arrayBuffer.byteLength === 0 && default_image === null) {
    return {
      error: true,
      message: "Debes seleccionar una fotoproducto",
    };
  }

  let uploadedAsset = default_image
    ? JSON.parse(default_image.toString())
    : null;

  if (!default_image && arrayBuffer.byteLength < 0) {
    // OPTIMIZAR Y SUBIR ARCHIVOS
    const { buffer: convertedBuffer } = await convertFile(arrayBuffer, {
      format: "avif",
    });

    if (!convertedBuffer)
      return {
        error: true,
        message: "Error al intentar optimizar el archivo",
      };
    const { uploadedAsset: uploaded } = await uploadFile(
      convertedBuffer,
      file.type
    );

    if (!uploaded)
      return {
        error: true,
        message: "Error al intentar subir el archivo optimizado",
      };

    uploadedAsset = uploaded;
  }
  const newProduct: ProductWithoutId = {
    title: title.toString(),
    category: category.toString(),
    image: uploadedAsset,
    created_at: new Date(),
    wholesale_price: Number(wholesale_price),
    retail_price: Number(retail_price),
    description: description.toString(),
    extra_info: "",
    in_stock: true,
    sub_category: sub_category.toString(),
  };

  const { upsertedId } = await productsModel.updateOne(
    { _id: new ObjectId(_id?.toString() ?? "") },
    { $set: newProduct },
    { upsert: true }
  );

  return {
    error: false,
    message: `¡${title} ${_id ? "editado" : "añadido"}!`,
    insertedProduct: {
      ...newProduct,
      _id: upsertedId?.toString(),
    } as Product,
  };
}
// BORRAR UNO
export async function deleteOne(
  formState: unknown,
  { id, publicId }: { id: string; publicId: string }
) {
  await productsModel.findOneAndDelete({ _id: new ObjectId(id) });

  await deleteFile(publicId);
  return {
    error: false,
  };
}
