"use client";
import Image from "next/image";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import styles from "./styles.module.css";
import { Chart } from "@/srcApp/widgets/chart";
import { useEffect, useState } from "react";
import { ErrorData } from "@/srcApp/shared/model/types";
import {
  PhotosStatsResult,
  UsersStatsResult,
} from "@/srcApp/entities/stats/model/types";
import { getPhotosStatsById } from "@/srcApp/entities/stats/api/getPhotosStatsById";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { toast } from "react-toastify";
import { fetchPhotosStatsWrapperWithId } from "@/srcApp/pages/stats/model/fetchPhotosStatsWrapperWithId";
import { getPhotosStatsForCurrentMonthByWeekById } from "@/srcApp/entities/stats/api/getPhotosStatsForCurrentMonthByWeekById";
import { getPhotosStatsForCurrentYearByMonthById } from "@/srcApp/entities/stats/api/getPhotosStatsForCurrentYearByMonthById";
import { getPhotosStatsForLast7DaysById } from "@/srcApp/entities/stats/api/getPhotosStatsForLast7DaysById";
import { fetchPhotosStatsWrapperWithOutId } from "../model/fetchPhotosStatsWrapperWithOutId";
import { getGeneralUsersStats } from "@/srcApp/entities/stats/api/getGeneralUsersStats";
import { getGeneralPhotosStats } from "@/srcApp/entities/stats/api/getGeneralPhotosStats";

export function StatsPage() {
  const { user } = useAppContext();
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
    if (user?.id) {
      (async () => {
        const fetchPromises = [
          fetchPhotosStatsWrapperWithId(
            getPhotosStatsById,
            setPhotosStatsUser,
            user?.id
          ),
          fetchPhotosStatsWrapperWithId(
            getPhotosStatsForCurrentYearByMonthById,
            setPhotosStatsUserYear,
            user?.id
          ),
          fetchPhotosStatsWrapperWithId(
            getPhotosStatsForCurrentMonthByWeekById,
            setPhotosStatsUserMonth,
            user?.id
          ),
          fetchPhotosStatsWrapperWithId(
            getPhotosStatsForLast7DaysById,
            setPhotosStatsUserWeek,
            user?.id
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
  }, [user?.id]);

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.photoStatsHeader}>Your photos stats</h2>
      <div className={styles.photoStats}>
        <div className={styles.photoStats__created}>
          <span>Created: {photosStatsUser?.created}</span>
        </div>
        <div className={styles.PhotoStats__viewed}>
          <span>Viewed: {photosStatsUser?.views}</span>
        </div>
        <div className={styles.PhotoStats__deleted}>
          <span>Deleted: {photosStatsUser?.deleted}</span>
        </div>
      </div>
      <div className={styles.photoStatsByDate}>
        <div className={styles.photoStatsYear}>
          <h3 className={styles.photoStatsYear__title}>Photo stats by Year</h3>
          <div className={styles.photoStatsYear_charts}>
            <div className={styles.photoStatsYearCreated}>
              <h4 className={styles.photoStatsYearCreated__title}>Created</h4>
              {photosStatsUserYear && (
                <Chart data={photosStatsUserYear} dataKey="created" />
              )}
            </div>
            <div className={styles.photoStatsYearViewed}>
              <h4 className={styles.photoStatsYearViewed__title}>Viewed</h4>
              {photosStatsUserYear && (
                <Chart data={photosStatsUserYear} dataKey="views" />
              )}
            </div>
            <div className={styles.photoStatsYearDeleted}>
              <h4 className={styles.photoStatsYearDeleted__title}>Deleted</h4>
              {photosStatsUserYear && (
                <Chart data={photosStatsUserYear} dataKey="deleted" />
              )}
            </div>
          </div>
        </div>
        <div className={styles.photoStatsMonth}>
          <h3 className={styles.photoStatsMonth__title}>
            Photo stats by Month
          </h3>
          <div className={styles.photoStatsMonth_charts}>
            <div className={styles.photoStatsMonthCreated}>
              <h4 className={styles.photoStatsMonthCreated__title}>Created</h4>
              {photosStatsUserMonth && (
                <Chart data={photosStatsUserMonth} dataKey="created" />
              )}
            </div>
            <div className={styles.photoStatsMonthViewed}>
              <h4 className={styles.photoStatsMonthViewed__title}>Viewed</h4>
              {photosStatsUserMonth && (
                <Chart data={photosStatsUserMonth} dataKey="views" />
              )}
            </div>
            <div className={styles.photoStatsMonthDeleted}>
              <h4 className={styles.photoStatsMonthDeleted__title}>Deleted</h4>
              {photosStatsUserMonth && (
                <Chart data={photosStatsUserMonth} dataKey="deleted" />
              )}
            </div>
          </div>
        </div>
        <div className={styles.photoStatsWeek}>
          <h3 className={styles.photoStatsWeek__title}>Photo stats by Week</h3>
          <div className={styles.photoStatsWeek_charts}>
            <div className={styles.photoStatsWeekCreated}>
              <h4 className={styles.photoStatsWeekCreated__title}>Created</h4>
              {photosStatsUserWeek && (
                <Chart data={photosStatsUserWeek} dataKey="created" />
              )}
            </div>
            <div className={styles.photoStatsWeekViewed}>
              <h4 className={styles.photoStatsWeekViewed__title}>Viewed</h4>
              {photosStatsUserWeek && (
                <Chart data={photosStatsUserWeek} dataKey="views" />
              )}
            </div>
            <div className={styles.photoStatsWeekDeleted}>
              <h4 className={styles.photoStatsWeekDeleted__title}>Deleted</h4>
              {photosStatsUserWeek && (
                <Chart data={photosStatsUserWeek} dataKey="deleted" />
              )}
            </div>
          </div>
        </div>
      </div>
      <h2 className={styles.generalStatsHeader}>Server-wide statistics</h2>
      <h3 className={styles.generalUserStatsHeader}>User stats</h3>
      <div className={styles.generalUserStats}>
        <div className={styles.generalUserStats__created}>
          <span>Created: {userStatsGeneral?.created}</span>
        </div>

        <div className={styles.generalUserStats__deleted}>
          <span>Deleted: {userStatsGeneral?.deleted}</span>
        </div>
      </div>
      <h3 className={styles.generalPhotoStatsHeader}>Photo stats</h3>
      <div className={styles.generalPhotoStats}>
        <div className={styles.generalPhotoStats__created}>
          <span>Created: {photoStatsGeneral?.created}</span>
        </div>
        <div className={styles.generalPhotoStats__viewed}>
          <span>Viewed: {photoStatsGeneral?.views}</span>
        </div>
        <div className={styles.generalPhotoStats__deleted}>
          <span>Deleted: {photoStatsGeneral?.deleted}</span>
        </div>
      </div>
    </div>
  );
}
