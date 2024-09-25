"use client";
import Image from "next/image";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
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
    <div className={styles.travelsContainer}>
      <div className={styles.schonada}>
        <h2 className={styles.schonada__text}>
          {currentUser && currentUser.payload && currentUser.payload[5]
            ? currentUser.payload[5].value
            : "SCHONADA"}
        </h2>
        <div className={styles.schonada__img}>
          <Image
            src={countryUrl1.imageSrc}
            width={1200}
            height={800}
            alt="photo_1"
            sizes="(max-width: 416px) 60vw, (max-width: 816px) 70vw, (max-width: 1400px) 80vw, (max-width: 1900px) 90vw, 100vw"
          />
        </div>
        <p className={styles.schonada__description}>
          {currentUser && currentUser.payload && currentUser.payload[7]
            ? currentUser.payload[7].value
            : "Welcome to Schonada, a small kingdom nestled among emerald hills and framed by the blue waters of a mysterious lake. Schonada is a place where dreams come true, and the breath of nature fills hearts with freshness. The country is renowned for its unique architecture, where ancient buildings coexist harmoniously with modern innovations. The capital, Totonto, captivates the imagination with its aerial bridges and the refined beauty of palaces, each a true masterpiece. Schonada is a land where every season transforms into a magical spectacle. In spring, gardens bloom with vibrant colors, and golden autumn welcomes with its warmth. Winter blankets the mountains in fluffy snow, creating perfect slopes for skiers and an atmosphere of coziness in every home. Schonada is known for its diversity of cultural events. Festivals and fairs fill the streets with the aromas of exotic cuisine and local crafts. Creativity, art, and music thrive here, bringing a sense of inspiration to every resident. The people of Schonada are renowned for their hospitality and warmth. The locals take pride in their cultural heritage and are eager to share their traditions with visitors. The harmony of nature and cultural richness makes Schonada a unique place where everyone can find something special. Welcome to the enchanting world of Schonada, where fairy tales come to life!"}
        </p>
        {currentUser && currentUser.payload && currentUser.payload[8] ? (
          <h2 className={styles.schonada__text}>
            {currentUser.payload[8].value}
          </h2>
        ) : null}
        {currentUser && currentUser.payload && currentUser.payload[9] ? (
          <div className={styles.schonada__img}>
            <Image
              src={countryUrl2.imageSrc}
              width={1200}
              height={800}
              alt="photo_2"
              sizes="(max-width: 416px) 60vw, (max-width: 816px) 70vw, (max-width: 1400px) 80vw, (max-width: 1900px) 90vw, 100vw"
            />
          </div>
        ) : null}
        {currentUser && currentUser.payload && currentUser.payload[10] ? (
          <p className={styles.schonada__description}>
            {currentUser.payload[10].value}
          </p>
        ) : null}
        {currentUser && currentUser.payload && currentUser.payload[11] ? (
          <h2 className={styles.schonada__text}>
            {currentUser.payload[11].value}
          </h2>
        ) : null}
        {currentUser && currentUser.payload && currentUser.payload[12] ? (
          <div className={styles.schonada__img}>
            <Image
              src={countryUrl3.imageSrc}
              width={1200}
              height={800}
              alt="photo_2"
              sizes="(max-width: 416px) 60vw, (max-width: 816px) 70vw, (max-width: 1400px) 80vw, (max-width: 1900px) 90vw, 100vw"
            />
          </div>
        ) : null}
        {currentUser && currentUser.payload && currentUser.payload[13] ? (
          <p className={styles.schonada__description}>
            {currentUser.payload[13].value}
          </p>
        ) : null}
      </div>
    </div>
  );
}
