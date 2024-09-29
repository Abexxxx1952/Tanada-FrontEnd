"use client";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import { TravelsPage } from "./travelsPage";
import { useLayoutEffect } from "react";
import { permanentRedirect } from "next/navigation";

export function TravelsPageWithOutUser() {
  const { currentUser } = useAppContext();

  const countryUrl1 = useImage(
    currentUser?.payload[6]?.value,
    "/images/schonada.jpg"
  );
  const countryUrl2 = useImage(
    currentUser?.payload[9]?.value,
    "/images/schonada.jpg"
  );
  const countryUrl3 = useImage(
    currentUser?.payload[12]?.value,
    "/images/schonada.jpg"
  );

  useLayoutEffect(() => {
    if (currentUser !== null) {
      permanentRedirect(`/travels/${currentUser.id}`);
    }
  }, []);

  return (
    <TravelsPage
      currentUser={null}
      countryUrl1={countryUrl1}
      countryUrl2={countryUrl2}
      countryUrl3={countryUrl3}
    />
  );
}
