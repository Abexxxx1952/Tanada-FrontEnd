"use client";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { Social } from "@/srcApp/widgets/social";
import { Images } from "@/srcApp/widgets/images";
import { permanentRedirect, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import styles from "./styles.module.css";
import { MainPage } from "./mainPage";

export function MainWithOutUserPage() {
  const { user, currentUser } = useAppContext();
  const router = useRouter();
  useLayoutEffect(() => {
    if (currentUser !== null) {
      permanentRedirect(`/${currentUser.id}`);
    }
  }, []);

  return <MainPage userId={null} currentUser={null} owner={false} />;
}
