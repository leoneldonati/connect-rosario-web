import Logo from "./shared/logo";

export default function PreFooter() {
  return (
    <footer className="flex flex-row justify-around px-4 pt-8 pb-16 bg-black">
      <Logo />

      <ul className="text-white">
        <li>
          <a href="">Quiénes Somos</a>
        </li>
        <li>
          <a href="">Cómo comprar</a>
        </li>
        <li>
          <a href="">Términos y condiciones</a>
        </li>
        <li>
          <a href="">Políticas de Privacidad</a>
        </li>
      </ul>
    </footer>
  );
}
