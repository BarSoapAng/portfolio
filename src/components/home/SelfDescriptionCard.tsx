import LiveClock from "./LiveClock";

import selfie from "@assets/home/selfie.jpg";

export default function SelfDescriptionCard() {
  return (
    <section className="home-hero">
      <img src={selfie.src} alt="Angela's selfie" width={220} />
      <div>
        <h1>Welcome</h1>
        <p>
          [Angela&apos;s Second Home] [<LiveClock />]
        </p>
        <p>
          <strong>Hello hello!</strong> This is a place where I share my experiences,
          thoughts, and my FAV tried and tested macro-friendly recipes :3
        </p>
        <p>
          I loveee my cat, playing League of Legends, and coding sites like these. But more
          than anything, <strong>I LOVE FOOD</strong>!
        </p>
        <p>
          I yap too much so if you want to know me better, check out{" "}
          <a href="/blog/who-am-i">this page</a> {"<3"}
        </p>
        <nav className="home-socials" aria-label="Social media">
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/ang018/">LinkedIn</a>
            </li>
            <li>
              <a href="https://github.com/BarSoapAng">GitHub</a>
            </li>
            <li>
              <a href="https://x.com/barsoapang">X</a>
            </li>
            <li>
              <a href="https://www.instagram.com/barsoapang">Instagram</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
