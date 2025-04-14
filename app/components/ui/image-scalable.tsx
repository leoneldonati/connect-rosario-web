"use client";
import Image, { type StaticImageData } from "next/image";
import React, { useRef, useEffect } from "react";

interface Props {
  image: StaticImageData;
}
const ImageScalable = ({ image }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    };

    const handleMouseLeave = () => {
      if (!img) return;
      img.style.transformOrigin = "center center";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden w-[350px] h-[350px] group"
      ref={containerRef}
    >
      <Image
        src={image}
        alt=""
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-150"
        ref={imgRef}
      />
    </div>
  );
};

export default ImageScalable;
