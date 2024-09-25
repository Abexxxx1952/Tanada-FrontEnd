"use client";
import { StatsPage } from "./stats";
import { useFetchStatsById } from "../model/useFetchStatsById";
import { useSetCurrentUser } from "@/srcApp/entities/user/model/useSetCurrentUser";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";

type StatsWithUserPageProps = {
  userId: string;
};

export function StatsWithUserPage({ userId }: StatsWithUserPageProps) {
  const { currentUser } = useAppContext();
  useSetCurrentUser(userId);

  const [
    photosStatsUser,
    photosStatsUserYear,
    photosStatsUserMonth,
    photosStatsUserWeek,
    userStatsGeneral,
    photoStatsGeneral,
  ] = useFetchStatsById(currentUser?.id);

  return (
    <StatsPage
      currentUser={currentUser}
      photosStatsUser={photosStatsUser}
      photosStatsUserYear={photosStatsUserYear}
      photosStatsUserMonth={photosStatsUserMonth}
      photosStatsUserWeek={photosStatsUserWeek}
      userStatsGeneral={userStatsGeneral}
      photoStatsGeneral={photoStatsGeneral}
    />
  );
}
