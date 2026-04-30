import { getStrapiURL } from "@/utils/get-strapi-url";

interface StrapiImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: string | number | boolean | undefined;
}

export function StrapiImage({
  src,
  alt,
  className,
  width,
  height,
  ...rest
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        objectFit: 'cover',
      }}
      {...rest}
    />
  );
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) {
    // Strapi returns absolute URLs based on its internal server config.
    // Replace any internal host (localhost / 127.0.0.1) with the configured public URL.
    const publicStrapiUrl = getStrapiURL();
    return url.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, publicStrapiUrl);
  }
  return getStrapiURL() + url;
}
