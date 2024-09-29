"use client";
import { StatsPage } from "./statsPage";
import { useFetchStatsById } from "../model/useFetchStatsById";
import { useSetCurrentUser } from "@/srcApp/entities/user/model/useSetCurrentUser";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";

type StatsWithUserPageProps = {
  userId: string;
  stats: string;
};

export function StatsWithUserPage({ userId, stats }: StatsWithUserPageProps) {
  useSetCurrentUser(userId);
  const { user, currentUser } = useAppContext();

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
      currentUser={stats === "stats" ? user : currentUser}
      photosStatsUser={photosStatsUser}
      photosStatsUserYear={photosStatsUserYear}
      photosStatsUserMonth={photosStatsUserMonth}
      photosStatsUserWeek={photosStatsUserWeek}
      userStatsGeneral={userStatsGeneral}
      photoStatsGeneral={photoStatsGeneral}
    />
  );
}
