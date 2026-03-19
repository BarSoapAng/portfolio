import { routes } from "../routes";

import Detective from "@assets/detective_magnifying_glass.gif";
import NavbarLink from "@components/ui/NavbarLink";

export default function NotFound() {
  return (
    <main className="flex flex-row gap-5 h-full items-center justify-center">
      <img
        src={Detective.src}
        className="w-40"
      />
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sand-1">Error 404</p>
        <h1 className="mt-3 text-4xl leading-tight text-gray-2">Page Not Found</h1>
        <p className="my-4 max-w-2xl text-sm leading-7 text-gray-1">
          Errmmm I don't think this page exists :( Checkout these pages instead!
        </p>

        <NavbarLink className="justify-start gap-5"></NavbarLink>
      </section>
    </main>
  );
}
