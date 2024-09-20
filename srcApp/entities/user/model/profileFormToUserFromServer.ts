import { UpdateUserDto } from "@/srcApp/entities/user/model/types";
import { UserProfileFormData } from "@/srcApp/pages/profile/model/types";

export function profileFormToUserFromServer(
  data: UserProfileFormData
): UpdateUserDto {
  const body: UpdateUserDto = { payload: [] };

  if (data.name) {
    body.name = data.name;
  }
  if (data.password) {
    body.password = data.password;
  }
  if (data.icon) {
    body.icon = data.icon;
  }
  if (data.instagramUrl) {
    body.payload[0] = { key: "instagramUrl", value: data.instagramUrl };
  }
  if (data.twitterUrl) {
    body.payload[1] = { key: "twitterUrl", value: data.twitterUrl };
  }
  if (data.mainTextContent) {
    body.payload[2] = { key: "mainTextContent", value: data.mainTextContent };
  }
  if (data.yourPhotoUrl) {
    body.payload[3] = { key: "yourPhotoUrl", value: data.yourPhotoUrl };
  }
  if (data.aboutYourself) {
    body.payload[4] = { key: "aboutYourself", value: data.aboutYourself };
  }
  if (data.countryName) {
    const countryNames = data.countryName.split("; ");
    if (countryNames[0]) {
      body.payload[5] = { key: "countryName 1", value: countryNames[0] };
    }
    if (countryNames[1]) {
      body.payload[8] = { key: "countryName 2", value: countryNames[1] };
    }
    if (countryNames[2]) {
      body.payload[11] = { key: "countryName 3", value: countryNames[2] };
    }
  }
  if (data.countryImageUrl) {
    const countryImageUrls = data.countryImageUrl.split("; ");
    if (countryImageUrls[0]) {
      body.payload[6] = {
        key: "countryImageUrl 1",
        value: countryImageUrls[0],
      };
    }
    if (countryImageUrls[1]) {
      body.payload[9] = {
        key: "countryImageUrl 2",
        value: countryImageUrls[1],
      };
    }
    if (countryImageUrls[2]) {
      body.payload[12] = {
        key: "countryImageUrl 3",
        value: countryImageUrls[2],
      };
    }
  }
  if (data.countryDescription) {
    const countryDescriptions = data.countryDescription.split("; ");
    if (countryDescriptions[0]) {
      body.payload[7] = {
        key: "countryDescriptions 1",
        value: countryDescriptions[0],
      };
    }
    if (countryDescriptions[1]) {
      body.payload[10] = {
        key: "countryDescriptions 2",
        value: countryDescriptions[1],
      };
    }
    if (countryDescriptions[2]) {
      body.payload[13] = {
        key: "countryDescriptions 3",
        value: countryDescriptions[2],
      };
    }
  }

  return body;
}
