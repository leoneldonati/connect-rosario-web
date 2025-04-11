"use server";

import { productsModel } from "@db";

export async function getProductById(id: string) {
  try {
    const product = await productsModel.findOne({ _id: id });

    if (!product) throw new Error("Este producto no existe");

    return product;
  } catch (e) {
    console.log(e);
    throw new Error("Error en el servidor");
  }
}
