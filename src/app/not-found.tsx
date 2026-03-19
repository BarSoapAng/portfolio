import Link from "next/link";
import { routes } from "../routes";

import Detective from "@assets/detective_magnifying_glass.gif";

export default function NotFound() {
  return (
    <main className="flex min-h-full items-center justify-center px-4 py-8 text-gray-2 sm:px-6">
      <section className="retro-panel w-full max-w-3xl bg-paper-2 shadow-retro-lg">
        <div className="retro-panel-inner bg-gradient-to-br from-cream-1 via-paper-1 to-cream-2 px-5 py-7 sm:px-8 sm:py-10">
          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.18em] text-sand-1">Error 404</p>
          <h1 className="mt-3 text-4xl leading-tight text-gray-2 sm:text-5xl">Page Not Found</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-1 sm:text-base">
            The page you requested does not exist or has moved. Use one of the links below to continue browsing.
          </p>
          <img
            src={Detective.src}
            className="mt-6 w-full max-w-xs border-2 border-blue-1 bg-paper-1 p-2"
          />

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {routes.map((route) => (
              <Link key={route.path} href={route.path} className="retro-button justify-center">
                Open {route.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
