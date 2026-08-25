import type { StaticImageData } from "next/image";
import { StyledContentImage } from "@components/ui/ContentImage.styles";

type ContentImageProps = {
  alt: string;
  src: StaticImageData;
  variant: "thumbnail" | "hero";
};

export default function ContentImage({ alt, src, variant }: ContentImageProps) {
  return (
    <StyledContentImage
      $variant={variant}
      alt={alt}
      height={900}
      sizes={variant === "hero" ? "(max-width: 1000px) 100vw, 1000px" : "(max-width: 52rem) 100vw, 42rem"}
      src={src}
      width={1600}
    />
  );
}
