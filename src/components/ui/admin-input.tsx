"use client";
import { createAdminSession } from "@actions/cookies";
import { IconLoader3 } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminInput() {
  const [state, action, pending] = useActionState(
    createAdminSession,
    undefined
  );

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
        htmlFor="username"
        className="border border-red-400 p-2 flex flex-col gap-2 rounded-md"
      >
        <small className="text-black/60 underline">
          Usuario administrador 🔒
        </small>
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Usuario administrador..."
          className="py-2 rounded-md w-full"
          required
        />
      </label>
      <label
        htmlFor="password"
        className="border border-red-400 p-2 flex flex-col gap-2 rounded-md"
      >
        <small className="text-black/60 underline">
          Contraseña administrador 🔒
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
        className={`px-4 py-1 rounded-md bg-red-400 text-white flex items-center gap-1 justify-center `}
      >
        {pending ? "Ingresando" : "Ingresar"}{" "}
        <IconLoader3
          className={`${pending ? "block" : "hidden"} animate-spin`}
        />
      </button>
    </form>
  );
}
