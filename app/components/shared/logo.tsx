import Image from "next/image";
import logo from "@/assets/logo-connect.svg";

export default function Logo() {
  return (
    <Image
      src={logo}
      alt="Logotipo de la empresa Connect. Empresa líder en electrónica y accesorios."
      className="max-w-[200px] object-contain"
    />
  );
}
