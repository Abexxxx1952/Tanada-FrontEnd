import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const useImage = (
  imageUrl: string | null | undefined,
  defaultUrl: string
): { imageSrc: string; isImageLoaded: boolean | null } => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isImageLoaded, setIsImageLoaded] = useState<boolean | null>(null);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        setImageSrc(imageUrl);
        setIsImageLoaded(true);
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
