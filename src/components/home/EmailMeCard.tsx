import gif from "@assets/home/email-me.gif";

export default function EmailMeCard() {
  return (
    <a
      href="mailto:soapangzhou@gmail.com"
      target="_top"
      className="group block h-full w-full border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-sm transition hover:-translate-y-0.5 hover:shadow-retro-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-1 focus-visible:ring-offset-2"
      aria-label="Send Angela an email"
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden border-2 border-pink-1 bg-cream-1">
        <img
          src={gif.src}
          alt="Click to email me"
          className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>
    </a>
  );
}
