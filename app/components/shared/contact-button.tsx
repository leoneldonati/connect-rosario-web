import Image from "next/image";
import WhatsAppSvg from "@assets/svg/brand-whatsapp.svg";
export default function ContactButton() {
  return (
    <a
      href={`https://api.whatsapp.com/send?phone=5493416669847&text=${encodeURIComponent(
        "Hola Connect! Quiero consultar"
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      id="contact-btn"
      className=" bg-white fixed z-50 bottom-3 right-3 rounded-full flex p-2 gap-1 items-center shadow-md bg-brand_2 shadow-black/80 transition-transform hover:scale-105 "
    >
      <Image src={WhatsAppSvg} alt="" />
      <strong className="text-brand_3"> Contáctanos </strong>
    </a>
  );
}
