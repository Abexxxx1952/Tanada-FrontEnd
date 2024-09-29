"use client";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import { TravelsPage } from "./travelsPage";
import { useSetCurrentUser } from "@/srcApp/entities/user/model/useSetCurrentUser";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";

type TravelsWithUserPageProps = {
  userId: string;
};

export function TravelsWithUserPage({ userId }: TravelsWithUserPageProps) {
  useSetCurrentUser(userId);
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

  return (
    <TravelsPage
      currentUser={currentUser}
      countryUrl1={countryUrl1}
      countryUrl2={countryUrl2}
      countryUrl3={countryUrl3}
    />
  );
}
