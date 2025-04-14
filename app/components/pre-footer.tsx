import Logo from "./shared/logo";

export default function PreFooter() {
  return (
    <footer className="flex md:flex-row flex-col items-center gap-4 justify-around px-4 pt-8 pb-16 bg-black">
      <Logo />

      <ul className="text-white">
        <li>
          <a href="/about">Quiénes Somos</a>
        </li>
        <li>
          <a href="/terms-and-conditions">Términos y condiciones</a>
        </li>
        <li>
          <a href="/privacity">Políticas de Privacidad</a>
        </li>
      </ul>
    </footer>
  );
}
