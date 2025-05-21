"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import asset_1 from "@assets/1.png";
import asset_2 from "@assets/2.png";
import asset_3 from "@assets/3.png";
export default function CarouselAuto() {
  const assets = [asset_1, asset_2, asset_3];
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
      setPosition((pos) => {
        if (pos === assets.length - 1) return 0;
        return pos + 1;
      });
    }, 3500);
    return () => clearInterval(timerId);
  }, []);
  return (
    <picture className="overflow-hidden  relative flex rounded-md my-3">
      <div
        className="flex flex-row transition-transform w-full h-full"
        style={{
          transform: `translateX(-${position * 100}%)`,
        }}
      >
        {assets.map((asset, index) => (
          <Image
            key={index}
            src={asset}
            alt={`Imagen ${index} del Carousel.`}
            className=" w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      <div
        className={`
      w-full flex flex-row  items-center gap-2 absolute bottom-3 z-10 justify-center 
      [&>span]:w-3 [&>span]:h-3 [&>span]:rounded-full [&>span]:bg-white
        `}
      >
        <span
          style={{
            backgroundColor: position === 0 ? "var(--color-brand-1)" : "white",
          }}
          onClick={() => setPosition(0)}
          className="cursor-pointer"
        ></span>
        <span
          style={{
            backgroundColor: position === 1 ? "var(--color-brand-1)" : "white",
          }}
          onClick={() => setPosition(1)}
          className="cursor-pointer"
        ></span>
        <span
          style={{
            backgroundColor: position === 2 ? "var(--color-brand-1)" : "white",
          }}
          onClick={() => setPosition(2)}
          className="cursor-pointer"
        ></span>
      </div>
    </picture>
  );
}
