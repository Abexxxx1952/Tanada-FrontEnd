"use client";
import Image from "next/image";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import styles from "./styles.module.css";
import { useIcon } from "@/srcApp/shared/hooks/useIcon";
import { useImage } from "@/srcApp/shared/hooks/useImage";

export function About() {
  const { user } = useAppContext();

  const photoUrl = useImage(user?.payload[3]?.value, "/images/me.png");

  return (
    <>
      <div className={styles.about__img}>
        <Image
          src={photoUrl.imageSrc}
          width={800}
          height={1000}
          alt="Photo"
          sizes="(max-width: 416px) 60vw, (max-width: 816px) 70vw, (max-width: 1400px) 80vw, (max-width: 1900px) 90vw, 100vw"
        />
      </div>
      <span className={styles.about__description}>
        {user && user.payload && user.payload[4]
          ? user.payload[4].value
          : "Hello, friends! My name is Sanya, and I am a blogger and an avid traveler whose life is filled with amazing moments and incredible stories. Welcome to my corner of the virtual space, where each page is a new adventure! My journey started not only on maps but also in the heart. Every country, every city, every cultural kaleidoscope has left its mark on my soul, and I am eager to share these experiences with you. My blog is not just about descriptions of places and landmarks but an attempt to convey the atmosphere, inspiration, and unique moments I experience on the road. Here, you will find not only travel reports but also useful tips, advice, and stories about how to discover the world at its best. I believe that travel expands our horizons and teaches us to see the beauty in diversity. My blog has also become a platform for sharing experiences and ideas. I strive to create content that inspires and motivates you to embark on your own adventure, discover new things, and unlock the potential of each journey. Join me on this exciting journey around the world! Let's explore, discover, and share the joy of unique moments together. ¡Vamonos! 🌍✈️"}
      </span>
    </>
  );
}
