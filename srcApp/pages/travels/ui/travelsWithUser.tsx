"use client";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import { TravelsPage } from "./travelsPage";
import { useSetCurrentUser } from "@/srcApp/entities/user/model/useSetCurrentUser";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { userDataFromPayload } from "@/srcApp/entities/user/model/userDataFromPayload";

type TravelsWithUserPageProps = {
  userId: string;
};

export function TravelsWithUserPage({ userId }: TravelsWithUserPageProps) {
  useSetCurrentUser(userId);
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

  return (
    <TravelsPage
      currentUser={currentUser}
      countryUrl1={countryUrl1}
      countryUrl2={countryUrl2}
      countryUrl3={countryUrl3}
    />
  );
}
