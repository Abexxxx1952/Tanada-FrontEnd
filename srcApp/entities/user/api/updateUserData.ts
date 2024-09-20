"use server";
import { UpdateUserDto } from "@/srcApp/entities/user/model/types";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import { getCookies } from "@/srcApp/features/auth/cookies/model/getCookies";
import { refreshTokens } from "@/srcApp/features/auth/refresh-tokens/model/refresh-tokens";
import { ErrorData, UpdateResult } from "@/srcApp/shared/model/types";
import { profileFormToUserFromServer } from "@/srcApp/entities/user/model/profileFormToUserFromServer";
import { UserProfileFormData } from "@/srcApp/pages/profile/model/types";

export async function updateUserData(
  data: UserProfileFormData
): Promise<UpdateResult | undefined | ErrorData> {
  const { access_token, refresh_token } = await getCookies();

  const body: UpdateUserDto = profileFormToUserFromServer(data);

  try {
    if (access_token) {
      const response = await fetch(`${process.env.UPDATE_USER_DATA_PATH}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData: ErrorData = await response.json();

        throw errorData;
      }

      const data: UpdateResult = await response.json();

      return data;
    }
    if (!access_token && refresh_token) {
      return await refreshTokens(refresh_token, updateUserData);
    }
  } catch (error: unknown) {
    if (isErrorData(error)) {
      return error;
    } else {
      console.log("error", error);
    }
  }
}
