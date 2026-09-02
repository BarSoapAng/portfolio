import NavbarLink from "@components/ui/NavbarLink";
import { Body, Heading1 } from "@components/ui/Typography";

export default function NotFound() {
  return (
    <main>
      <Body>Error 404</Body>
      <Heading1>Page Not Found</Heading1>
      <Body>Errmmm I don&apos;t think this page exists :( Check out these pages instead!</Body>
      <NavbarLink />
    </main>
  );
}
