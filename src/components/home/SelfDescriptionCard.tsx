import LiveClock from "./LiveClock";

import selfie from "@assets/home/selfie.jpg";

export default function SelfDescriptionCard() {
  return (
    <section>
      <img src={selfie.src} alt="Angela's selfie" width={220} />
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
    </section>
  );
}
