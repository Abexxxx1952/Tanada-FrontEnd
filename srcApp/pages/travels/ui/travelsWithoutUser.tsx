"use client";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import { TravelsPage } from "./travelsPage";
import { useLayoutEffect } from "react";
import { permanentRedirect } from "next/navigation";
import { userDataFromPayload } from "@/srcApp/entities/user/model/userDataFromPayload";

export function TravelsPageWithOutUser() {
  const { currentUser } = useAppContext();

  const countryUrl1 = useImage(
    userDataFromPayload(currentUser, "countryImageUrl_1"),
    "/images/country.png"
  );
  const countryUrl2 = useImage(
    userDataFromPayload(currentUser, "countryImageUrl_2"),
    "/images/country.png"
  );
  const countryUrl3 = useImage(
    userDataFromPayload(currentUser, "countryImageUrl_3"),
    "/images/country.png"
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
