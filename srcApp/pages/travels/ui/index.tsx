"use client";
import Image from "next/image";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { useImage } from "@/srcApp/shared/hooks/useImage";
import styles from "./styles.module.css";
export function TravelsPage() {
  const { user } = useAppContext();

  const countryUrl1 = useImage(user?.payload[6]?.value, "/images/schonada.jpg");
  const countryUrl2 = useImage(user?.payload[9]?.value, "/images/schonada.jpg");
  const countryUrl3 = useImage(
    user?.payload[12]?.value,
    "/images/schonada.jpg"
  );
  return (
    <div className={styles.travelsContainer}>
      <div className={styles.schonada}>
        <h2 className={styles.schonada__text}>
          {user && user.payload && user.payload[5]
            ? user.payload[5].value
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
          {user && user.payload && user.payload[7]
            ? user.payload[7].value
            : "Welcome to Schonada, a small kingdom nestled among emerald hills and framed by the blue waters of a mysterious lake. Schonada is a place where dreams come true, and the breath of nature fills hearts with freshness. The country is renowned for its unique architecture, where ancient buildings coexist harmoniously with modern innovations. The capital, Totonto, captivates the imagination with its aerial bridges and the refined beauty of palaces, each a true masterpiece. Schonada is a land where every season transforms into a magical spectacle. In spring, gardens bloom with vibrant colors, and golden autumn welcomes with its warmth. Winter blankets the mountains in fluffy snow, creating perfect slopes for skiers and an atmosphere of coziness in every home. Schonada is known for its diversity of cultural events. Festivals and fairs fill the streets with the aromas of exotic cuisine and local crafts. Creativity, art, and music thrive here, bringing a sense of inspiration to every resident. The people of Schonada are renowned for their hospitality and warmth. The locals take pride in their cultural heritage and are eager to share their traditions with visitors. The harmony of nature and cultural richness makes Schonada a unique place where everyone can find something special. Welcome to the enchanting world of Schonada, where fairy tales come to life!"}
        </p>
        {user && user.payload && user.payload[8] ? (
          <h2 className={styles.schonada__text}>{user.payload[8].value}</h2>
        ) : null}
        {user && user.payload && user.payload[9] ? (
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
        {user && user.payload && user.payload[10] ? (
          <p className={styles.schonada__description}>
            {user.payload[10].value}
          </p>
        ) : null}
        {user && user.payload && user.payload[11] ? (
          <h2 className={styles.schonada__text}>{user.payload[11].value}</h2>
        ) : null}
        {user && user.payload && user.payload[12] ? (
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
        {user && user.payload && user.payload[13] ? (
          <p className={styles.schonada__description}>
            {user.payload[13].value}
          </p>
        ) : null}
      </div>
    </div>
  );
}
