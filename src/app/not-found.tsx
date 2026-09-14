import poroQuestion from "@assets/404/poro-question.png";
import NavbarLink from "@components/ui/NavbarLink";
import { Body, Heading1 } from "@components/ui/Typography";
import { NotFoundContent, NotFoundImage, NotFoundMain } from "./NotFound.styles";

export default function NotFound() {
  return (
    <NotFoundMain>
      <NotFoundImage
        src={poroQuestion}
        alt="A puzzled Poro wondering where the page went"
        priority
      />
      <NotFoundContent>
        <Body>Error 404</Body>
        <Heading1>Page Not Found</Heading1>
        <Body>
          Errmmm, I don&apos;t think this page exists :( Check out these pages instead!
        </Body>
        <NavbarLink />
      </NotFoundContent>
    </NotFoundMain>
  );
}
