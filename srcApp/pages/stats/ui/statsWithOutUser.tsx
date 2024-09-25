"use client";
import { useLayoutEffect } from "react";
import { StatsPage } from "./stats";
import { useFetchStats } from "@/srcApp/pages/stats/model/useFetchStats";
import { permanentRedirect } from "next/navigation";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";

export function StatsWithOutUserPage() {
  const { currentUser } = useAppContext();

  useLayoutEffect(() => {
    if (currentUser !== null) {
      permanentRedirect(`/stats/${currentUser.id}`);
    }
  }, []);

  const [
    photosStatsUser,
    photosStatsUserYear,
    photosStatsUserMonth,
    photosStatsUserWeek,
    userStatsGeneral,
    photoStatsGeneral,
  ] = useFetchStats();
  return (
    <StatsPage
      currentUser={null}
      photosStatsUser={photosStatsUser}
      photosStatsUserYear={photosStatsUserYear}
      photosStatsUserMonth={photosStatsUserMonth}
      photosStatsUserWeek={photosStatsUserWeek}
      userStatsGeneral={userStatsGeneral}
      photoStatsGeneral={photoStatsGeneral}
    />
  );
}
