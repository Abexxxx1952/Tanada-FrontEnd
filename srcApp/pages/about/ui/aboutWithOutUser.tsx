"use client";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import { permanentRedirect } from "next/navigation";
import { useLayoutEffect } from "react";
import { AboutPage } from "./aboutPage";
import { userDataFromPayload } from "@/srcApp/entities/user/model/userDataFromPayload";

export function AboutWithOutUserPage() {
  const { currentUser } = useAppContext();

  const photoUrl = useImage(
    userDataFromPayload(currentUser, "yourPhotoUrl"),
    "/images/me.webp"
  );
  useLayoutEffect(() => {
    if (currentUser !== null) {
      permanentRedirect(`/about/${currentUser.id}`);
    }
  }, []);

  return <AboutPage currentUser={null} photoUrl={photoUrl} />;
}
