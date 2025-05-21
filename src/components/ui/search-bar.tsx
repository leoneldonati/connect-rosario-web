"use client";

import { IconLoader, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useState, type ChangeEvent } from "react";

interface Props {
  list: Product[];
}
export default function SearchBar({ list }: Props) {
  const [searching, setSearching] = useState(false);
  const [filteredList, setFilteredList] = useState<Product[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearching(true);
    const name = e.target.value;

    const timer = setTimeout(() => {
      const filtered = list.filter((item) =>
        item.title.toLowerCase().includes(name.toLowerCase())
      );

      setFilteredList(name === "" ? [] : filtered);
      setSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchValue = new FormData(e.currentTarget).get("search");

    if (!searchValue) return;
  };
  return (
    <div className="relative max-w-[300px] w-full">
      <form
        onSubmit={onSubmit}
        className=" w-full bg-white/30 text-white flex p-2 rounded-2xl"
      >
        <input
          onChange={handleChange}
          type="text"
          placeholder="Buscar..."
          className="w-full flex"
          name="search"
        />
        <button>
          {searching ? <IconLoader className="animate-spin" /> : <IconSearch />}
        </button>
      </form>

      {filteredList.length > 0 && (
        <ul className="absolute z-50 top-full left-0 w-full max-h-[700px] overflow-y-scroll bg-white/95 rounded">
          {filteredList.map((item) => (
            <Link
              href={`/product/${item._id}`}
              key={item._id}
              className="flex p-2 items-center gap-4 transition-colors hover:bg-neutral-300"
              title={`Ver ${item.title}`}
            >
              <Image
                src={item.image?.secureUrl ?? ""}
                width={50}
                height={50}
                alt={item.title}
                className="rounded-full aspect-square"
              />

              <p>{item.title}</p>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
