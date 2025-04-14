"use client";

import { createSession } from "@actions/cookies";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function LoginInput() {
  const [state, action, pending] = useActionState(createSession, undefined);

  useEffect(() => {
    if (!state) return;

    if (state && state.error) {
      toast.error(state.message);
      return;
    }

    toast.success("¡Logueado como mayorista!");
  }, [state]);
  return (
    <form action={action} className="bg-white rounded-md">
      <input
        type="password"
        name="password"
        placeholder="Acceso"
        className="p-2 rounded-md"
        disabled={pending}
        required
      />
    </form>
  );
}
