import AdminInput from "@components/ui/admin-input";
import LoginInput from "@components/ui/login-input";
import { IconDiamondFilled, IconLockAccess } from "@tabler/icons-react";

export default function Login() {
  return (
    <section className="flex flex-col items-center gap-5 py-4">
      <h3 className="text-2xl flex items-center gap-1 text-brand-1">
        Mayorista <IconDiamondFilled />
      </h3>
      <LoginInput />

      <h3 className="text-2xl flex items-center gap-1 text-red-500">
        Administrador <IconLockAccess />
      </h3>
      <AdminInput />
    </section>
  );
}
