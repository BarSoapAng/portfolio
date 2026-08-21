import { StyledContentImage } from "@components/ui/ContentImage.styles";

type ContentImageProps = {
  alt: string;
  src: string;
  variant: "thumbnail" | "hero";
};

export default function ContentImage({ alt, src, variant }: ContentImageProps) {
  return (
    <StyledContentImage
      $variant={variant}
      alt={alt}
      height={900}
      sizes={variant === "hero" ? "(max-width: 70rem) 100vw, 70rem" : "(max-width: 52rem) 100vw, 42rem"}
      src={src}
      width={1600}
    />
  );
}
