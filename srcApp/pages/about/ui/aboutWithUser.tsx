"use client";
import { useSetCurrentUser } from "@/srcApp/entities/user/model/useSetCurrentUser";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import { AboutPage } from "./aboutPage";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { userDataFromPayload } from "@/srcApp/entities/user/model/userDataFromPayload";

type AboutWithUserPageProps = {
  userId: string;
};

export function AboutWithUserPage({ userId }: AboutWithUserPageProps) {
  useSetCurrentUser(userId);
  const { currentUser } = useAppContext();

  const photoUrl = useImage(
    userDataFromPayload(currentUser, "yourPhotoUrl"),
    "/images/me.png"
  );

  return <AboutPage currentUser={currentUser} photoUrl={photoUrl} />;
}
