"use client";
import { useSetCurrentUser } from "@/srcApp/entities/user/model/useSetCurrentUser";
import { MainPage } from "./mainPage";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";

type MainWithUserPageProps = {
  userId: string;
};

export function MainWithUserPage({ userId }: MainWithUserPageProps) {
  useSetCurrentUser(userId);
  const { user, currentUser } = useAppContext();

  return <MainPage currentUser={currentUser} owner={user?.id === userId} />;
}
