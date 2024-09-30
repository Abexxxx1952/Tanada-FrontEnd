import {
  UpdateUserDto,
  UserFromServer,
} from "@/srcApp/entities/user/model/types";

export function userDataFromPayload(
  user: UserFromServer | null,
  key: string
): string | null {
  const body: UpdateUserDto = { payload: [] };
  if (user === null) return null;
  if ((key = "instagramUrl"))
    return user.payload[0] ? user.payload[0].value : null;
  if ((key = "twitterUrl"))
    return user.payload[1] ? user.payload[1].value : null;
  if ((key = "mainTextContent"))
    return user.payload[2] ? user.payload[2].value : null;
  if ((key = "yourPhotoUrl"))
    return user.payload[3] ? user.payload[3].value : null;
  if ((key = "aboutYourself"))
    return user.payload[4] ? user.payload[4].value : null;
  if ((key = "countryName_1"))
    return user.payload[5] ? user.payload[5].value : null;
  if ((key = "countryName_2"))
    return user.payload[8] ? user.payload[8].value : null;
  if ((key = "countryName_3"))
    return user.payload[11] ? user.payload[11].value : null;
  if ((key = "countryImageUrl_1"))
    return user.payload[6] ? user.payload[6].value : null;
  if ((key = "countryImageUrl_2"))
    return user.payload[9] ? user.payload[9].value : null;
  if ((key = "countryImageUrl_3"))
    return user.payload[12] ? user.payload[12].value : null;
  if ((key = "countryDescriptions_1"))
    return user.payload[7] ? user.payload[7].value : null;
  if ((key = "countryDescriptions_2"))
    return user.payload[10] ? user.payload[10].value : null;
  if ((key = "countryDescriptions_3"))
    return user.payload[13] ? user.payload[13].value : null;

  return null;
}
