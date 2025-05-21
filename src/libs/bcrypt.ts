"use server";
import { compare } from "bcrypt";
async function verifyPassword(password: string, hash: string) {
  return await compare(password, hash);
}

export { verifyPassword };
