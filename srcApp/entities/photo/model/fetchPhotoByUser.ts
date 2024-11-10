"use client";
import { ErrorData } from "@/srcApp/shared/model/types";
import { Photo } from "@/srcApp/entities/photo/model/types";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { toast } from "react-toastify";
import { shuffleArray } from "@/srcApp/shared/model/shuffleArray";
import { fetchAllPhoto } from "../api/fetchAllPhotoData";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { fetchAllPhotoByUserId } from "../api/fetchPhotoDataByUserId";

export async function fetchPhotoByUser(
  user: UserFromServer | null,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[] | null>>,
  abortControllerRef: React.MutableRefObject<AbortController | null>
): Promise<undefined> {
  if (user === null) {
    const photoOrError: Photo[] | undefined | ErrorData = await fetchAllPhoto(
      abortControllerRef
    );

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
      setPhotos(shuffleArray<Photo>(photoOrError));
    }
  }

  if (user !== null) {
    const photoOrError: Photo[] | undefined | ErrorData =
      await fetchAllPhotoByUserId(user.id, abortControllerRef);

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
