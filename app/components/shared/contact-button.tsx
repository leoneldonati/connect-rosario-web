import Image from "next/image";
import WhatsAppSvg from "@assets/svg/brand-whatsapp.svg";
import { PHONE_NUMBER } from "@constants";
export default function ContactButton() {
  const message = "Hola Connect! Quiero consultar";
  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(
        message
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      id="contact-btn"
      className="bg-white fixed z-50 bottom-3 right-3 rounded-full flex p-2 gap-1 items-center shadow-md bg-brand_2 shadow-black/80 transition-transform hover:scale-105 "
    >
      <Image src={WhatsAppSvg} alt="" />
      <strong> Contáctanos </strong>
    </a>
  );
}
