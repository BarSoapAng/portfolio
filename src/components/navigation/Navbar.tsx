import Link from "next/link";
import NavbarLink from "@components/ui/NavbarLink";

export default function Navbar() {
  return (
    <header>
      <p>
        <Link href="/home">Angela&apos;s Universe</Link>
      </p>
      <NavbarLink />
    </header>
  );
}
