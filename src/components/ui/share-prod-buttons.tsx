"use client";
import { CANNONICAL_URL } from "@constants";
import {
  IconBrandFacebookFilled,
  IconBrandWhatsappFilled,
  IconBrandXFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ShareButtonsProps {
  product: Product;
}

export default function ShareButtons({ product }: ShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(`${CANNONICAL_URL}/product/${product._id}`);
  }, [product._id]);

  const shareText = `¡Mira este increíble ${product.title} por $${product.retail_price} en Connect Rosario!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("¡Enlace copiado al portapapeles!");
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <p className="text-lg font-semibold text-black/60">Compartir producto</p>
      <div className="flex gap-2 flex-wrap">
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            shareText + " " + shareUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white font-bold px-4 py-2 rounded-md flex items-center gap-1"
        >
          <IconBrandWhatsappFilled />
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md flex items-center gap-1"
        >
          <IconBrandFacebookFilled />
        </a>

        {/* Twitter/X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white font-bold px-4 py-2 rounded-md flex items-center gap-1"
        >
          <IconBrandXFilled />
        </a>

        {/* Copiar enlace */}
        <button
          onClick={copyToClipboard}
          className="bg-gray-500 text-white font-bold px-4 py-2 rounded-md flex items-center gap-1"
        >
          Copiar enlace
        </button>
      </div>
    </div>
  );
}
