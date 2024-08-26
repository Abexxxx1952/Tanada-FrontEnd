"use client";
import Image from "next/image";

import styles from "./styles.module.css";
import { useIcon } from "@/srcApp/shared/hooks/useIcon";
import { Input } from "@/srcApp/shared/ui/input";
import { Button } from "@/srcApp/shared/ui/button";

export function Profile() {
  /* const imageSrc = useIcon(user); */

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.header__logo}>
          <Image src="/icons/logged.svg" alt="avatar" fill={true} />
        </div>
        <span className={styles.header__email}>Profile</span>
        <span className={styles.header__createdAt}>Created at</span>
        <span className={styles.header__updatedAt}>Updated at</span>
      </div>
      <div className={styles.body}>
        <div className={styles.body__item}>
          <Input
            text="Name"
            placeholder="Yours name"
            color="var(--contentTextColor)"
            onChange={() => {}}
            value={"name"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="Password"
            placeholder="**********"
            color="var(--contentTextColor)"
            type="password"
            onChange={() => {}}
            value={"password"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="Icon"
            placeholder="Icon url"
            color="var(--contentTextColor)"
            onChange={() => {}}
            value={"Icon url"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="Permissions"
            placeholder="Permissions"
            color="var(--contentTextColor)"
            disabled={true}
            onChange={() => {}}
            value={"Permissions"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="RegistrationSources"
            placeholder="RegistrationSources"
            color="var(--contentTextColor)"
            onChange={() => {}}
            disabled={true}
            value={"RegistrationSources"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="Instagram url"
            placeholder="Instagram url"
            color="var(--contentTextColor)"
            onChange={() => {}}
            value={"Instagram url"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="Twitter url"
            placeholder="Twitter url"
            color="var(--contentTextColor)"
            onChange={() => {}}
            value={"Twitter url"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="Main text content"
            placeholder="Main text content"
            color="var(--contentTextColor)"
            onChange={() => {}}
            value={"Main text content"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="Country name"
            placeholder="Country name"
            color="var(--contentTextColor)"
            onChange={() => {}}
            value={"Country name"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="Country image url"
            placeholder="Country image url"
            color="var(--contentTextColor)"
            onChange={() => {}}
            value={"Country image url"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="Country descriptions"
            placeholder="Country descriptions"
            color="var(--contentTextColor)"
            onChange={() => {}}
            value={"Country descriptions"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="Your photo url"
            placeholder="Your photo url"
            color="var(--contentTextColor)"
            onChange={() => {}}
            value={"Your photo url"}
          />
        </div>
        <div className={styles.body__item}>
          <Input
            text="About yourself"
            placeholder="About yourself"
            color="var(--contentTextColor)"
            onChange={() => {}}
            value={"About yourself"}
          />
        </div>
      </div>
      <div className={styles.submit}>
        <Button
          onClick={() => {}}
          text="Submit"
          textColor="white"
          backgroundColor="var(--logoColor)"
          focusBackgroundColor="var(--logoColor)"
        />
      </div>
    </div>
  );
}
