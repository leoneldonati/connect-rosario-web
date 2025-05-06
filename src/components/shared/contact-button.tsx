import { IconBrandWhatsappFilled } from "@tabler/icons-react";
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
      className="bg-white text-green-500 fixed z-50 bottom-3 right-3 rounded-full flex p-2 gap-1 items-center shadow-md bg-brand_2 shadow-green-300 transition-transform hover:scale-105 "
    >
      <IconBrandWhatsappFilled />
      <strong> Contáctanos </strong>
    </a>
  );
}
