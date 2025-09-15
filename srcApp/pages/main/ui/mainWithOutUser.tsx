"use client";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { permanentRedirect } from "next/navigation";
import { useLayoutEffect } from "react";
import { MainPage } from "./mainPage";

export function MainWithOutUserPage() {
  const { currentUser } = useAppContext();

  useLayoutEffect(() => {
    if (currentUser !== null) {
      permanentRedirect(`/${currentUser.id}`);
    }
  }, []);

  return <MainPage userId={null} currentUser={null} owner={false} />;
}
