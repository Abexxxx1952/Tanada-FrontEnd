import { useState, useEffect } from "react";
import {
  PhotosStatsResult,
  UsersStatsResult,
} from "@/srcApp/entities/stats/model/types";
import { fetchPhotosStatsWrapperWithId } from "./fetchPhotosStatsWrapperWithId";
import { getPhotosStatsById } from "@/srcApp/entities/stats/api/getPhotosStatsById";
import { getPhotosStatsForCurrentYearByMonthById } from "@/srcApp/entities/stats/api/getPhotosStatsForCurrentYearByMonthById";
import { getPhotosStatsForCurrentMonthByWeekById } from "@/srcApp/entities/stats/api/getPhotosStatsForCurrentMonthByWeekById";
import { getPhotosStatsForLast7DaysById } from "@/srcApp/entities/stats/api/getPhotosStatsForLast7DaysById";
import { fetchPhotosStatsWrapperWithOutId } from "./fetchPhotosStatsWrapperWithOutId";
import { getGeneralUsersStats } from "@/srcApp/entities/stats/api/getGeneralUsersStats";
import { getGeneralPhotosStats } from "@/srcApp/entities/stats/api/getGeneralPhotosStats";

export function useFetchStatsById(
  id: string | undefined
): [
  photosStatsUser: PhotosStatsResult | null,
  photosStatsUserYear: PhotosStatsResult[] | null,
  photosStatsUserMonth: PhotosStatsResult[] | null,
  photosStatsUserWeek: PhotosStatsResult[] | null,
  userStatsGeneral: UsersStatsResult | null,
  photoStatsGeneral: PhotosStatsResult | null
] {
  const [photosStatsUser, setPhotosStatsUser] =
    useState<PhotosStatsResult | null>(null);
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
    if (id) {
      (async () => {
        const fetchPromises = [
          fetchPhotosStatsWrapperWithId(
            getPhotosStatsById,
            setPhotosStatsUser,
            id
          ),
          fetchPhotosStatsWrapperWithId(
            getPhotosStatsForCurrentYearByMonthById,
            setPhotosStatsUserYear,
            id
          ),
          fetchPhotosStatsWrapperWithId(
            getPhotosStatsForCurrentMonthByWeekById,
            setPhotosStatsUserMonth,
            id
          ),
          fetchPhotosStatsWrapperWithId(
            getPhotosStatsForLast7DaysById,
            setPhotosStatsUserWeek,
            id
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
    }
  }, [id]);
  return [
    photosStatsUser,
    photosStatsUserYear,
    photosStatsUserMonth,
    photosStatsUserWeek,
    userStatsGeneral,
    photoStatsGeneral,
  ];
}
