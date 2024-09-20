import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { useEffect, useState } from "react";

export const useIcon = (
  imageUrl: string | undefined,
  logOut: string,
  logIn: string,
  user?: UserFromServer | null
): { imageSrc: string; isImageLoaded: boolean | null } => {
  const [imageSrc, setImageSrc] = useState<string>(logOut);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean | null>(null);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        setIsImageLoaded(true);
        setImageSrc(imageUrl || logIn);
      };
      img.onerror = () => {
        setImageSrc(logIn);
        setIsImageLoaded(false);
        return;
      };
    }
    setImageSrc(user ? logIn : logOut);
  }, [imageUrl]);

  return { imageSrc, isImageLoaded };
};
