import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { useEffect, useState } from "react";

export const useIcon = (user: UserFromServer | null) => {
  const [imageSrc, setImageSrc] = useState("/icons/header-account.svg");

  useEffect(() => {
    if (user && user.icon) {
      const img = new Image();
      img.src = user.icon;

      img.onload = () => setImageSrc(user.icon || "/icons/logged.svg");
      img.onerror = () => setImageSrc("/icons/logged.svg");
    }
    setImageSrc(user ? "/icons/logged.svg" : "/icons/header-account.svg");
  }, [user]);
  return imageSrc;
};
