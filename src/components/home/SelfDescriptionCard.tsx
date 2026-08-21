import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import selfie from "@assets/home/selfie.jpg";

export default function SelfDescriptionCard() {
  return (
    <section className="home-hero">
      <img src={selfie.src} alt="Angela's selfie" width={220} />
      <div>
        <h1>Welcome</h1>
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
              <a aria-label="LinkedIn" href="https://www.linkedin.com/in/ang018/">
                <FaLinkedinIn aria-hidden />
              </a>
            </li>
            <li>
              <a aria-label="GitHub" href="https://github.com/BarSoapAng">
                <FaGithub aria-hidden />
              </a>
            </li>
            <li>
              <a aria-label="X" href="https://x.com/barsoapang">
                <FaXTwitter aria-hidden />
              </a>
            </li>
            <li>
              <a aria-label="Instagram" href="https://www.instagram.com/barsoapang">
                <FaInstagram aria-hidden />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
