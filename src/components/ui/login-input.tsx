"use client";

import { createSession } from "@actions/cookies";
import { IconLoader3 } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function LoginInput() {
  const [state, action, pending] = useActionState(createSession, undefined);

  useEffect(() => {
    if (state && state.error) {
      toast.error(state.message);
    }

    if (state && !state.error) {
      toast.success(state.message);
      redirect("/");
    }
  }, [state]);
  return (
    <form
      action={action}
      className="bg-white rounded-md flex flex-col gap-3 max-w-[400px] mx-auto w-full"
    >
      <label
        htmlFor="password"
        className="border border-brand-1 p-2 flex flex-col gap-2 rounded-md"
      >
        <small className="text-black/60 underline">
          Ingresa tu contraseña de mayorista 🔒
        </small>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña de acceso..."
          className="py-2 rounded-md w-full"
          required
        />
      </label>

      <button
        className={`px-4 py-1 rounded-md bg-brand-1 text-white flex items-center gap-1 justify-center `}
      >
        {pending ? "Ingresando" : "Ingresar"}{" "}
        <IconLoader3
          className={`${pending ? "block" : "hidden"} animate-spin`}
        />
      </button>
    </form>
  );
}
