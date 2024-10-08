"use client";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useIcon } from "@/srcApp/shared/hooks/useIcon";
import { Input } from "@/srcApp/shared/ui/input";
import { Button } from "@/srcApp/shared/ui/button";
import { TextArea } from "@/srcApp/shared/ui/text-area";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import { UserProfileFormData } from "@/srcApp/pages/profile/model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/srcApp/pages/profile/lib/schema";
import { userFromServerToProfileFormData } from "@/srcApp/pages/profile/model/userFromServerToProfileFormData";
import { updateUserData } from "@/srcApp/entities/user/api/updateUserData";
import { useKeyboardHandler } from "@/srcApp/shared/hooks/useKeyboardHandler";
import { notifyResponse } from "@/srcApp/shared/model/notifyResponse";
import { ErrorData, UpdateResult } from "@/srcApp/shared/model/types";
import { fetchUserData } from "@/srcApp/entities/user/api/fetchUserData";
import {
  UpdateUserDto,
  UserFromServer,
} from "@/srcApp/entities/user/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { toast } from "react-toastify";
import { isUserFromServer } from "@/srcApp/entities/user/model/isUserFromServer";
import { profileFormToUserFromServer } from "@/srcApp/entities/user/model/profileFormToUserFromServer";
import styles from "./styles.module.css";
import { DropZone } from "@/srcApp/shared/ui/drop-zone";
import { uploadImage } from "@/srcApp/shared/model/uploadImage";

export function ProfilePage() {
  const { user, setUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState<HTMLBodyElement | null>(null);
  const [iconBase64, setIconBase64] = useState<string | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [countryImageBase64, setCountryImageBase64] = useState<string | null>(
    null
  );
  const [countryImage, setCountryImage] = useState<File | null>(null);
  const [yourPhotoBase64, setYourPhotoBase64] = useState<string | null>(null);
  const [yourPhoto, setYourPhoto] = useState<File | null>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);
  const countryImageInputRef = useRef<HTMLInputElement>(null);
  const yourPhotoInputRef = useRef<HTMLInputElement>(null);
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
    [
      "Enter",
      handleSubmit((data) => onSubmit(data, icon, countryImage, yourPhoto)),
      [icon, countryImage, yourPhoto],
    ],
    ["Escape", () => router.push("/")],
  ]);

  useEffect(() => {
    setBody(document.querySelector("body"));
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [user, reset]);

  const handleIconInputClick = () => {
    if (iconInputRef.current) {
      iconInputRef.current.click();
    }
  };
  const handleCountryImageInputClick = () => {
    if (countryImageInputRef.current) {
      countryImageInputRef.current.click();
    }
  };
  const handleYourPhotoInputClick = () => {
    if (yourPhotoInputRef.current) {
      yourPhotoInputRef.current.click();
    }
  };

  function onSubmit(
    data: UserProfileFormData,
    icon: File | null,
    countryImage: File | null,
    yourPhoto: File | null
  ) {
    setLoading(true);
    const uploadPromises = [];
    (async () => {
      if (icon !== null) {
        uploadPromises.push(
          uploadImage(icon).then((iconUrl) => {
            if (iconUrl !== undefined) data.icon = iconUrl;
          })
        );
      }

      if (countryImage !== null) {
        uploadPromises.push(
          uploadImage(countryImage).then((countryImageUrl) => {
            if (countryImageUrl !== undefined)
              data.countryImageUrl = countryImageUrl;
          })
        );
      }

      if (yourPhoto !== null) {
        uploadPromises.push(
          uploadImage(yourPhoto).then((yourPhotoUrl) => {
            if (yourPhotoUrl !== undefined) data.yourPhotoUrl = yourPhotoUrl;
          })
        );
      }

      try {
        await Promise.all(uploadPromises);

        const body: UpdateUserDto = profileFormToUserFromServer(data);

        const updateResult = await updateUserData(body);

        await fetch("/api/revalidateUserByCookies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        notifyResponse<UpdateResult>(updateResult, "Data updated successfully");

        const userOrError: UserFromServer | undefined | ErrorData =
          await fetchUserData();

        if (userOrError === undefined) {
          setUser(null);
        }

        if (isErrorData(userOrError)) {
          toast.error(
            `Error: ${userOrError.status} ${
              userOrError.statusText
            }. Massage: ${JSON.stringify(userOrError)}`,
            {
              position: "top-right",
            }
          );
          setUser(null);
        }

        if (isUserFromServer(userOrError)) {
          setUser(userOrError);
        }
      } catch (error) {
        toast.error("An unexpected error occurred.", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
        setTimeout(() => window.location.reload(), 0);
      }
    })();
  }

  return (
    <div className={styles.profileContainer} aria-labelledby="profile-heading">
      <div className={styles.profile}>
        <div className={styles.header}>
          <span className={styles.header__logo}>
            <Image src={imageSrc.imageSrc} alt="avatar" fill={true} />
          </span>
          <span className={styles.header__email}>{user?.email}</span>
          <div className={styles.dateInfo}>
            <time className={styles.dateInfo__createdAt}>
              Created at:&nbsp;
              {user?.createdAt?.toLocaleString().split("T")[0] || "N/A"}
            </time>
            <time className={styles.dateInfo__updatedAt}>
              Updated at:&nbsp;
              {user?.updatedAt?.toLocaleString().split("T")[0] || "N/A"}
            </time>
          </div>
        </div>
        <form
          className={styles.body}
          onSubmit={handleSubmit((data) =>
            onSubmit(data, icon, countryImage, yourPhoto)
          )}
        >
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
          <div
            className={`${
              iconBase64 ? styles.body__dropZone_icon : styles.body__dropZone
            }`}
          >
            <label
              htmlFor={"dropzone-icon"}
              className={` ${
                iconBase64 ? styles.labelIcon : styles.labelDropZone
              }`}
            >
              Icon
            </label>
            <span className={`${iconBase64 ? styles.iconField : ""}`}>
              <DropZone
                id={"dropzone-icon"}
                selectedPhotoBase64={iconBase64}
                setSelectedPhotoBase64={setIconBase64}
                setSelectedPhoto={setIcon}
                handleInputClick={handleIconInputClick}
                ref={iconInputRef}
              />
            </span>
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
          <div
            className={`${
              countryImageBase64
                ? styles.body__dropZone_country
                : styles.body__dropZone
            }`}
          >
            <label
              htmlFor={"dropzone-country"}
              className={` ${
                countryImageBase64 ? styles.labelCountry : styles.labelDropZone
              }`}
            >
              Country
            </label>
            <span
              className={`${countryImageBase64 ? styles.countryField : ""}`}
            >
              <DropZone
                id={"dropzone-country"}
                selectedPhotoBase64={countryImageBase64}
                setSelectedPhotoBase64={setCountryImageBase64}
                setSelectedPhoto={setCountryImage}
                handleInputClick={handleCountryImageInputClick}
                ref={countryImageInputRef}
              />
            </span>
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
          <div
            className={`${
              yourPhotoBase64
                ? styles.body__dropZone_yourPhoto
                : styles.body__dropZone
            }`}
          >
            <label
              htmlFor={"dropzone-yourPhoto"}
              className={` ${
                yourPhotoBase64 ? styles.labelYourPhoto : styles.labelDropZone
              }`}
            >
              Your photo url
            </label>
            <span className={`${yourPhotoBase64 ? styles.yourPhotoField : ""}`}>
              <DropZone
                id={"dropzone-yourPhoto"}
                selectedPhotoBase64={yourPhotoBase64}
                setSelectedPhotoBase64={setYourPhotoBase64}
                setSelectedPhoto={setYourPhoto}
                handleInputClick={handleYourPhotoInputClick}
                ref={yourPhotoInputRef}
              />
            </span>
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
