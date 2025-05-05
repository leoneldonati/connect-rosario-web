"use client";

import { useProductStore } from "@store/products";

export default function ProductsCounter({ ...props }) {
  const { list } = useProductStore();
  return <span {...props}>{list.length}</span>;
}
