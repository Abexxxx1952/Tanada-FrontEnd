"use client";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useIcon } from "@/srcApp/shared/hooks/useIcon";
import { Input } from "@/srcApp/shared/ui/input";
import { Button } from "@/srcApp/shared/ui/button";
import { TextArea } from "@/srcApp/shared/ui/text-area";
import { useEffect, useState } from "react";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { UserProfileFormData } from "@/srcApp/pages/profile/model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/srcApp/pages/profile/lib/schema";
import { userFromServerToProfileFormData } from "@/srcApp/pages/profile/model/userFromServerToProfileFormData";
import { updateUserData } from "@/srcApp/entities/user/api/updateUserData";
import { useKeyboardHandler } from "@/srcApp/shared/hooks/useKeyboardHandler";
import { notifyResponse } from "@/srcApp/shared/model/notifyResponse";
import { UpdateResult } from "@/srcApp/shared/model/types";
import styles from "./styles.module.css";

export function ProfilePage() {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState<HTMLBodyElement | null>(null);
  const router = useRouter();

  const imageSrc = useIcon(
    user?.icon,
    "/icons/header-account.svg",
    "/icons/logged.svg",
    user
  );

  const defaultValues = userFromServerToProfileFormData(user);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  useKeyboardHandler(body, [
    ["Enter", handleSubmit(onSubmit)],
    ["Escape", () => router.push("/")],
  ]);

  useEffect(() => {
    setBody(document.querySelector("body"));
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [user, reset]);

  function onSubmit(data: UserProfileFormData) {
    setLoading(true);
    (async () => {
      const updateResult = await updateUserData(data);

      notifyResponse<UpdateResult>(updateResult, "Data updated successfully");
    })();
    setLoading(false);
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profile}>
        <div className={styles.header}>
          <div className={styles.header__logo}>
            <Image src={imageSrc.imageSrc} alt="avatar" fill={true} />
          </div>
          <span className={styles.header__email}>{user?.email}</span>
          <div className={styles.dateInfo}>
            <span className={styles.dateInfo__createdAt}>
              Created at:&nbsp;
              {user?.createdAt?.toLocaleString().split("T")[0] || "N/A"}
            </span>
            <span className={styles.dateInfo__updatedAt}>
              Updated at:&nbsp;
              {user?.updatedAt?.toLocaleString().split("T")[0] || "N/A"}
            </span>
          </div>
        </div>
        <form className={styles.body} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.body__input}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  text="Name"
                  placeholder="Yours name"
                  color="var(--contentTextColor)"
                  error={errors.name?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__input}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  text="Password"
                  placeholder="**********"
                  color="var(--contentTextColor)"
                  type="password"
                  error={errors.password?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__input}>
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <Input
                  text="Icon"
                  placeholder="Icon url"
                  color="var(--contentTextColor)"
                  error={errors.icon?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__input}>
            <Controller
              name="permissions"
              control={control}
              render={({ field }) => (
                <Input
                  text="Permissions"
                  placeholder="Permissions"
                  color="var(--contentTextColor)"
                  disabled={true}
                  error={errors.registrationSources?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__input}>
            <Controller
              name="registrationSources"
              control={control}
              render={({ field }) => (
                <Input
                  text="RegistrationSources"
                  placeholder="RegistrationSources"
                  color="var(--contentTextColor)"
                  disabled={true}
                  error={errors.registrationSources?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__input}>
            <Controller
              name="instagramUrl"
              control={control}
              render={({ field }) => (
                <Input
                  text="Instagram url"
                  placeholder="Instagram url"
                  color="var(--contentTextColor)"
                  error={errors.instagramUrl?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__input}>
            <Controller
              name="twitterUrl"
              control={control}
              render={({ field }) => (
                <Input
                  text="Twitter url"
                  placeholder="Twitter url"
                  color="var(--contentTextColor)"
                  error={errors.twitterUrl?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__textarea}>
            <Controller
              name="mainTextContent"
              control={control}
              render={({ field }) => (
                <TextArea
                  text="Main text content"
                  placeholder="Main text content"
                  color="var(--contentTextColor)"
                  error={errors.mainTextContent?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__input}>
            <Controller
              name="countryName"
              control={control}
              render={({ field }) => (
                <Input
                  text="Country name"
                  placeholder="Country name"
                  color="var(--contentTextColor)"
                  error={errors.countryName?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__input}>
            <Controller
              name="countryImageUrl"
              control={control}
              render={({ field }) => (
                <Input
                  text="Country image url"
                  placeholder="Country image url"
                  color="var(--contentTextColor)"
                  error={errors.countryImageUrl?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__textarea}>
            <Controller
              name="countryDescription"
              control={control}
              render={({ field }) => (
                <TextArea
                  text="Country descriptions"
                  placeholder="Country descriptions"
                  color="var(--contentTextColor)"
                  error={errors.countryDescription?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__input}>
            <Controller
              name="yourPhotoUrl"
              control={control}
              render={({ field }) => (
                <Input
                  text="Your photo url"
                  placeholder="Your photo url"
                  color="var(--contentTextColor)"
                  error={errors.yourPhotoUrl?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.body__textarea}>
            <Controller
              name="aboutYourself"
              control={control}
              render={({ field }) => (
                <TextArea
                  text="About yourself"
                  placeholder="About yourself"
                  color="var(--contentTextColor)"
                  error={errors.aboutYourself?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.submit}>
            <Button
              type="submit"
              text="Submit"
              textColor="white"
              backgroundColor="var(--logoColor)"
              focusTextColor="white"
              focusBackgroundColor="var(--buttonLoginBackgroundColor)"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
