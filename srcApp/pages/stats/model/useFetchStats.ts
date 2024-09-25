import { useState, useEffect } from "react";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import {
  PhotosStatsResult,
  UsersStatsResult,
} from "@/srcApp/entities/stats/model/types";
import { getPhotosStatsForCurrentYearByMonth } from "@/srcApp/entities/stats/api/getPhotosStatsForCurrentYearByMonth";
import { getPhotosStatsForCurrentMonthByWeek } from "@/srcApp/entities/stats/api/getPhotosStatsForCurrentMonthByWeek";
import { getPhotosStatsForLast7Days } from "@/srcApp/entities/stats/api/getPhotosStatsForLast7Days";
import { fetchPhotosStatsWrapperWithOutId } from "./fetchPhotosStatsWrapperWithOutId";
import { getGeneralUsersStats } from "@/srcApp/entities/stats/api/getGeneralUsersStats";
import { getGeneralPhotosStats } from "@/srcApp/entities/stats/api/getGeneralPhotosStats";

export function useFetchStats(): [
  photosStatsUser: PhotosStatsResult | null,
  photosStatsUserYear: PhotosStatsResult[] | null,
  photosStatsUserMonth: PhotosStatsResult[] | null,
  photosStatsUserWeek: PhotosStatsResult[] | null,
  userStatsGeneral: UsersStatsResult | null,
  photoStatsGeneral: PhotosStatsResult | null
] {
  const [photosStatsUser] = useState<PhotosStatsResult | null>(null);
  const [photosStatsUserYear, setPhotosStatsUserYear] = useState<
    PhotosStatsResult[] | null
  >(null);
  const [photosStatsUserMonth, setPhotosStatsUserMonth] = useState<
    PhotosStatsResult[] | null
  >(null);
  const [photosStatsUserWeek, setPhotosStatsUserWeek] = useState<
    PhotosStatsResult[] | null
  >(null);
  const [userStatsGeneral, setUserStatsGeneral] =
    useState<UsersStatsResult | null>(null);
  const [photoStatsGeneral, setPhotoStatsGeneral] =
    useState<PhotosStatsResult | null>(null);

  useEffect(() => {
    (async () => {
      const fetchPromises = [
        fetchPhotosStatsWrapperWithOutId(
          getPhotosStatsForCurrentYearByMonth,
          setPhotosStatsUserYear
        ),
        fetchPhotosStatsWrapperWithOutId(
          getPhotosStatsForCurrentMonthByWeek,
          setPhotosStatsUserMonth
        ),
        fetchPhotosStatsWrapperWithOutId(
          getPhotosStatsForLast7Days,
          setPhotosStatsUserWeek
        ),
        fetchPhotosStatsWrapperWithOutId(
          getGeneralUsersStats,
          setUserStatsGeneral
        ),
        fetchPhotosStatsWrapperWithOutId(
          getGeneralPhotosStats,
          setPhotoStatsGeneral
        ),
      ];

      try {
        const result = await Promise.allSettled(fetchPromises);
      } catch (error) {
        console.error("Error fetching photos stats:", error);
      }
    })();
  }, []);
  return [
    photosStatsUser,
    photosStatsUserYear,
    photosStatsUserMonth,
    photosStatsUserWeek,
    userStatsGeneral,
    photoStatsGeneral,
  ];
}
