"use client";
import { useSetCurrentUser } from "@/srcApp/entities/user/model/useSetCurrentUser";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import { AboutPage } from "./about";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";

type AboutWithUserPageProps = {
  userId: string;
};

export function AboutWithUserPage({ userId }: AboutWithUserPageProps) {
  const { currentUser } = useAppContext();
  useSetCurrentUser(userId);
  const photoUrl = useImage(currentUser?.payload[3]?.value, "/images/me.png");

  return <AboutPage currentUser={currentUser} photoUrl={photoUrl} />;
}
