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
      className=" text-wsp-brand fixed z-50 bottom-3 right-3  transition-transform hover:scale-105 "
    >
      <IconBrandWhatsappFilled className="size-16 " />
    </a>
  );
}
