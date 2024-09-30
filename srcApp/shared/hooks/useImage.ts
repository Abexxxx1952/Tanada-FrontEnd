import { useEffect, useState } from "react";

export const useImage = (
  imageUrl: string | null | undefined,
  defaultUrl: string
): { imageSrc: string; isImageLoaded: boolean | null } => {
  const [imageSrc, setImageSrc] = useState<string>(defaultUrl);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean | null>(null);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        setIsImageLoaded(true);
        setImageSrc(imageUrl || defaultUrl);
      };
      img.onerror = () => {
        setImageSrc(defaultUrl);
        setIsImageLoaded(false);
        return;
      };
    }
    setImageSrc(defaultUrl);
  }, [imageUrl]);

  return { imageSrc, isImageLoaded };
};
