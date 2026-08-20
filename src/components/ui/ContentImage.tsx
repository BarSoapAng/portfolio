import Image from "next/image";

type ContentImageProps = {
  alt: string;
  src: string;
  variant: "thumbnail" | "hero";
};

export default function ContentImage({ alt, src, variant }: ContentImageProps) {
  return (
    <Image
      alt={alt}
      className={`content-image content-image--${variant}`}
      height={900}
      sizes={variant === "hero" ? "(max-width: 70rem) 100vw, 70rem" : "(max-width: 52rem) 100vw, 42rem"}
      src={src}
      width={1600}
    />
  );
}
