"use client";

import { clearSession } from "@actions/cookies";
import { ADMIN_COOKIE } from "@constants";
import { IconLoader3 } from "@tabler/icons-react";
import { type FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function CloseAdminButton() {
  const [pending, setPending] = useState(false);
  const handleCloseWholesaleSession = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    await clearSession(ADMIN_COOKIE);

    toast.success("¡Nos vemos pronto!");
    setPending(false);
  };
  return (
    <form onSubmit={handleCloseWholesaleSession}>
      <button className="text-red-500 px-2 py-1 rounded bg-red-200 flex items-center gap-1">
        {pending ? "Cerrando sesión.." : "Cerrar sesión"}{" "}
        <IconLoader3
          className={`${pending ? "block" : "hidden"} animate-spin`}
        />
      </button>
    </form>
  );
}
