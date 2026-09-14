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
      sizes={
        variant === "hero"
          ? "(max-width: 900px) 100vw, 900px"
          : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20rem"
      }
      src={src}
      width={1600}
    />
  );
}
