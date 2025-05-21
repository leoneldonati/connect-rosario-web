"use client";
import { getAvaliblesCategories } from "@actions/products";
import { useEffect, useState } from "react";

export default function useAvalibleCategories() {
  const [avalibleCategories, setAvalibleCategories] = useState<
    { category: string; subCategories: string[] }[]
  >([]);
  const [stats, setStats] = useState({
    pending: false,
  });

  useEffect(() => {
    setStats((prev) => ({ ...prev, pending: true }));
    getAvaliblesCategories()
      .then(({ avalibleCategories }) =>
        setAvalibleCategories(avalibleCategories ?? [])
      )
      .finally(() => {
        setStats((prev) => ({ ...prev, pending: false }));
      });
  }, []);

  return {
    avalibleCategories,
    pending: stats.pending,
  };
}
