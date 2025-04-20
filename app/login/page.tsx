import LoginInput from "@components/ui/login-input";
import { IconDiamondFilled } from "@tabler/icons-react";

export default function Login() {
  return (
    <section className="flex flex-col items-center gap-5">
      <h3 className="text-2xl flex items-center gap-1">
        Accede como mayorista <IconDiamondFilled className="text-brand-1" />
      </h3>
      <LoginInput />
    </section>
  );
}
