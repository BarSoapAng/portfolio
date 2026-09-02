import selfie from "@assets/home/selfie.webp";
import { Body, Heading1, Strong } from "@components/ui/Typography";
import {
  HighlightedGreeting,
  Hero,
  HeroContent,
  HeroImage,
} from "./SelfDescriptionCard.styles";

export default function SelfDescriptionCard() {
  return (
    <Hero>
      <HeroImage src={selfie.src} alt="Angela's selfie" width={230} />
      <HeroContent>
        <Heading1>
          <HighlightedGreeting>Hello hello!</HighlightedGreeting>
        </Heading1>
        <Body>
          This is a place where I share my experiences, what I'm up to, and 
          my (not so) crazy shower thoughts :3
        </Body>
        <Body>
          I loveee my cat, playing League of Legends, and coding sites like these. But more
          than anything, <Strong>I LOVE FOOD</Strong>!
        </Body>
        <Body>
          I yap too much so if you want to know me better, check out{" "}
          <a href="/blog/who-am-i">this page</a> {"<3"}
        </Body>
      </HeroContent>
    </Hero>
  );
}
