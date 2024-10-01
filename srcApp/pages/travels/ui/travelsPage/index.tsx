"use client";
import Image from "next/image";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { userDataFromPayload } from "@/srcApp/entities/user/model/userDataFromPayload";
import styles from "./styles.module.css";

type TravelsPageProps = {
  currentUser: UserFromServer | null;
  countryUrl1: {
    imageSrc: string;
    isImageLoaded: boolean | null;
  };
  countryUrl2: {
    imageSrc: string;
    isImageLoaded: boolean | null;
  };
  countryUrl3: {
    imageSrc: string;
    isImageLoaded: boolean | null;
  };
};

export function TravelsPage({
  currentUser,
  countryUrl1,
  countryUrl2,
  countryUrl3,
}: TravelsPageProps) {
  return (
    <div
      className={styles.travelsContainer}
      role="article"
      aria-labelledby="travels-title"
    >
      <div className={styles.country}>
        <h2 className={styles.country__text} id="travels-title">
          {userDataFromPayload(currentUser, "countryName_1") ?? "SCHONADA"}
        </h2>
        <span className={styles.country__img}>
          <Image
            src={countryUrl1.imageSrc}
            fill={true}
            alt="photo_1"
            sizes="(max-width: 416px) 60vw, (max-width: 816px) 70vw, (max-width: 1400px) 80vw, (max-width: 1900px) 90vw, 100vw"
          />
        </span>
        <p className={styles.country__description}>
          {userDataFromPayload(currentUser, "countryDescriptions_1") ??
            "Welcome to Schonada, a small kingdom nestled among emerald hills and framed by the blue waters of a mysterious lake. Schonada is a place where dreams come true, and the breath of nature fills hearts with freshness. The country is renowned for its unique architecture, where ancient buildings coexist harmoniously with modern innovations. The capital, Totonto, captivates the imagination with its aerial bridges and the refined beauty of palaces, each a true masterpiece. Schonada is a land where every season transforms into a magical spectacle. In spring, gardens bloom with vibrant colors, and golden autumn welcomes with its warmth. Winter blankets the mountains in fluffy snow, creating perfect slopes for skiers and an atmosphere of coziness in every home. Schonada is known for its diversity of cultural events. Festivals and fairs fill the streets with the aromas of exotic cuisine and local crafts. Creativity, art, and music thrive here, bringing a sense of inspiration to every resident. The people of Schonada are renowned for their hospitality and warmth. The locals take pride in their cultural heritage and are eager to share their traditions with visitors. The harmony of nature and cultural richness makes Schonada a unique place where everyone can find something special. Welcome to the enchanting world of Schonada, where fairy tales come to life!"}
        </p>
        {userDataFromPayload(currentUser, "countryName_2") && (
          <h2 className={styles.country__text}>
            {userDataFromPayload(currentUser, "countryName_2")}
          </h2>
        )}
        {userDataFromPayload(currentUser, "countryImageUrl_2") && (
          <span className={styles.country__img}>
            <Image
              src={countryUrl2.imageSrc}
              fill={true}
              alt="photo_2"
              sizes="(max-width: 416px) 60vw, (max-width: 816px) 70vw, (max-width: 1400px) 80vw, (max-width: 1900px) 90vw, 100vw"
            />
          </span>
        )}
        {userDataFromPayload(currentUser, "countryDescriptions_2") && (
          <p className={styles.country__description}>
            {userDataFromPayload(currentUser, "countryDescriptions_2")}
          </p>
        )}
        {userDataFromPayload(currentUser, "countryName_3") && (
          <h2 className={styles.country__text}>
            {userDataFromPayload(currentUser, "countryName_3")}
          </h2>
        )}
        {userDataFromPayload(currentUser, "countryImageUrl_3") && (
          <span className={styles.country__img}>
            <Image
              src={countryUrl3.imageSrc}
              fill={true}
              alt="photo_3"
              sizes="(max-width: 416px) 60vw, (max-width: 816px) 70vw, (max-width: 1400px) 80vw, (max-width: 1900px) 90vw, 100vw"
            />
          </span>
        )}
        {userDataFromPayload(currentUser, "countryDescriptions_3") && (
          <p className={styles.country__description}>
            {userDataFromPayload(currentUser, "countryDescriptions_3")}
          </p>
        )}
      </div>
    </div>
  );
}
