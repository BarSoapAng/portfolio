import Detective from "@assets/404/detective_magnifying_glass.gif";
import NavbarLink from "@components/ui/NavbarLink";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4 py-10 sm:flex-row sm:gap-10 sm:px-6">
      <img
        src={Detective.src}
        alt="A pixel detective searching with a magnifying glass"
        className="w-32 sm:w-40"
      />
      <section className="border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md">
        <div className="border-2 border-sand-1 bg-cream-1 px-5 py-5">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-sand-1">
            Error 404
          </p>
          <h1 className="mt-2 text-3xl leading-tight text-gray-2 sm:text-4xl">
            Page Not Found
          </h1>
          <p className="my-4 max-w-2xl text-sm leading-7 text-gray-1">
            Errmmm I don&apos;t think this page exists :( Check out these pages instead!
          </p>

          <NavbarLink className="justify-start gap-3" />
        </div>
      </section>
    </div>
  );
}
