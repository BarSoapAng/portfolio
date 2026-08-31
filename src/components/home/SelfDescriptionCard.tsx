import selfie from "@assets/home/selfie.webp";
import {
  Hero,
  HeroContent,
  HeroImage,
} from "./SelfDescriptionCard.styles";

export default function SelfDescriptionCard() {
  return (
    <Hero>
      <HeroImage src={selfie.src} alt="Angela's selfie" width={230} />
      <HeroContent>
        <h1>Hello hello!</h1>
        <p>
          This is a place where I share my experiences, what I'm up to, and 
          my (not so) crazy shower thoughts :3
        </p>
        <p>
          I loveee my cat, playing League of Legends, and coding sites like these. But more
          than anything, <strong>I LOVE FOOD</strong>!
        </p>
        <p>
          I yap too much so if you want to know me better, check out{" "}
          <a href="/blog/who-am-i">this page</a> {"<3"}
        </p>
      </HeroContent>
    </Hero>
  );
}
