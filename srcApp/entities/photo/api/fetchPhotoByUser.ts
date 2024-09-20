"use client";
import { ErrorData } from "@/srcApp/shared/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { fetchAllPhoto } from "@/srcApp/entities/photo/api/fetchAllPhotoData";
import { toast } from "react-toastify";
import { fetchAllPhotoByUserId } from "@/srcApp/entities/photo/api/fetchPhotoDataByUserId";

export async function fetchPhotoByUser(
  user: UserFromServer | null,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[] | null>>
): Promise<undefined> {
  if (user === null) {
    const photoOrError: Photo[] | undefined | ErrorData = await fetchAllPhoto();

    if (isErrorData(photoOrError)) {
      toast.error(
        `Error: ${photoOrError.status} ${
          photoOrError.statusText
        }. Massage: ${JSON.stringify(photoOrError)}`,
        {
          position: "top-right",
        }
      );
    }

    if (photoOrError !== undefined && Array.isArray(photoOrError)) {
      setPhotos(photoOrError);
    }
  }

  if (user !== null) {
    const photoOrError: Photo[] | undefined | ErrorData =
      await fetchAllPhotoByUserId(user.id);

    if (isErrorData(photoOrError)) {
      toast.error(
        `Error: ${photoOrError.status} ${
          photoOrError.statusText
        }. Massage: ${JSON.stringify(photoOrError)}`,
        {
          position: "top-right",
        }
      );
    }

    if (photoOrError !== undefined && Array.isArray(photoOrError)) {
      setPhotos(photoOrError);
    }
  }
}
