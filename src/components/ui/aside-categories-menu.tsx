import AsideDesplegableMenu from "./aside-desplegable-menu";

export default function AsideCategoriesMenu() {
  return (
    <aside className="flex flex-col mt-5">
      <p className="text-brand-1 font-bold py-2 border-b border-neutral-200">
        Categorías
      </p>

      <AsideDesplegableMenu />
    </aside>
  );
}
