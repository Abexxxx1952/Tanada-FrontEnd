import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { UserProfileFormData } from "./types";

export function userFromServerToProfileFormData(
  user: UserFromServer | null
): UserProfileFormData {
  const payload = user?.payload || [];

  return {
    name: user?.name || "",
    password: "",
    icon: user?.icon || "",
    permissions: (user?.permissions || []).join(", "),
    registrationSources: (user?.registrationSources || []).join(", "),
    instagramUrl: payload[0] && payload[0].value ? payload[0].value : "",
    twitterUrl: payload[1] && payload[1].value ? payload[1].value : "",
    mainTextContent: payload[2] && payload[2].value ? payload[2].value : "",
    yourPhotoUrl: payload[3] && payload[3].value ? payload[3].value : "",
    aboutYourself: payload[4] && payload[4].value ? payload[4].value : "",
    countryName:
      (payload[5]?.value || "") +
      (payload[8]?.value ? "; " + payload[8].value : "") +
      (payload[11]?.value ? "; " + payload[11].value : ""),
    countryImageUrl:
      (payload[6]?.value || "") +
      (payload[9]?.value ? "; " + payload[9].value : "") +
      (payload[12]?.value ? "; " + payload[12].value : ""),
    countryDescription:
      (payload[7]?.value || "") +
      (payload[10]?.value ? "; " + payload[10].value : "") +
      (payload[13]?.value ? "; " + payload[13].value : ""),
  };
}
