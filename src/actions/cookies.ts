"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { verifyPassword } from "../libs/bcrypt";
import { adminModel } from "../db";
import { ObjectId } from "mongodb";
import { WHOLESALE_COOKIE } from "@constants";

const obtainCookiesStore = async () => await cookies();

export async function isWholesale() {
  const cookie = await obtainCookiesStore();
  if (!cookie) return false;

  const token = cookie.get(WHOLESALE_COOKIE);

  if (!token) return false;
  return true;
}
export async function clearSession(cookieName: string) {
  const cookieStore = await obtainCookiesStore();

  cookieStore.delete(cookieName);

  return redirect("/");
}

export async function createSession(formState: unknown, formData: FormData) {
  const { password } = Object.fromEntries(formData);

  if (!password.toString())
    return {
      error: true,
      message: "¡Debes enviar una contraseña!",
    };

  const adminId = process.env.ADMIN_ID ?? "";
  const encryptedPassword = await adminModel.findOne({
    _id: new ObjectId(adminId),
  });
  if (!encryptedPassword)
    return {
      error: true,
      message: "¡No existe el administrador!",
    };
  const isMatch = await verifyPassword(
    password.toString(),
    encryptedPassword.password
  );

  if (!isMatch)
    return {
      error: true,
      message: "¡Sólo los mayoristas tienen acceso!",
    };

  const jwtPrivate = process.env.PRIVATE_KEY ?? "";
  const token = jwt.sign({ created_at: new Date() }, jwtPrivate, {
    expiresIn: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  const cookieStore = await obtainCookiesStore();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookieStore.set(WHOLESALE_COOKIE, token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return {
    error: false,
    message: "Bienvenido!",
  };
}
