"use client";

import { useProductStore } from "@store/products";
import { useEffect } from "react";

interface Props {
  products: Product[];
}
export default function ProductsLoader({ products }: Props) {
  const { addMultiple } = useProductStore();
  useEffect(() => {
    addMultiple(products);
  }, [products]);
  return false;
}
