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
  if (body.payload) {
    if (data.instagramUrl) {
      body.payload[0] = { key: "instagramUrl", value: data.instagramUrl };
    } else {
      body.payload[0] = { key: "instagramUrl", value: "" };
    }
    if (data.twitterUrl) {
      body.payload[1] = { key: "twitterUrl", value: data.twitterUrl };
    } else {
      body.payload[1] = { key: "twitterUrl", value: "" };
    }
    if (data.mainTextContent) {
      body.payload[2] = { key: "mainTextContent", value: data.mainTextContent };
    } else {
      body.payload[2] = { key: "mainTextContent", value: "" };
    }
    if (data.yourPhotoUrl) {
      body.payload[3] = { key: "yourPhotoUrl", value: data.yourPhotoUrl };
    } else {
      body.payload[3] = { key: "yourPhotoUrl", value: "" };
    }
    if (data.aboutYourself) {
      body.payload[4] = { key: "aboutYourself", value: data.aboutYourself };
    } else {
      body.payload[4] = { key: "aboutYourself", value: "" };
    }
    if (data.countryName) {
      const countryNames = data.countryName.split("; ");
      if (countryNames[0]) {
        body.payload[5] = { key: "countryName_1", value: countryNames[0] };
      } else {
        body.payload[5] = { key: "countryName_1", value: "" };
      }
      if (countryNames[1]) {
        body.payload[8] = { key: "countryName_2", value: countryNames[1] };
      } else {
        body.payload[8] = { key: "countryName_2", value: "" };
      }
      if (countryNames[2]) {
        body.payload[11] = { key: "countryName_3", value: countryNames[2] };
      } else {
        body.payload[11] = { key: "countryName_3", value: "" };
      }
    } else {
      body.payload[5] = { key: "countryName_1", value: "" };
      body.payload[8] = { key: "countryName_2", value: "" };
      body.payload[11] = { key: "countryName_3", value: "" };
    }
    if (data.countryImageUrl) {
      const countryImageUrls = data.countryImageUrl.split("; ");
      if (countryImageUrls[0]) {
        body.payload[6] = {
          key: "countryImageUrl_1",
          value: countryImageUrls[0],
        };
      } else {
        body.payload[6] = { key: "countryImageUrl_1", value: "" };
      }
      if (countryImageUrls[1]) {
        body.payload[9] = {
          key: "countryImageUrl_2",
          value: countryImageUrls[1],
        };
      } else {
        body.payload[9] = { key: "countryImageUrl_2", value: "" };
      }
      if (countryImageUrls[2]) {
        body.payload[12] = {
          key: "countryImageUrl_3",
          value: countryImageUrls[2],
        };
      } else {
        body.payload[12] = { key: "countryImageUrl_3", value: "" };
      }
    } else {
      body.payload[6] = { key: "countryImageUrl_1", value: "" };
      body.payload[9] = { key: "countryImageUrl_2", value: "" };
      body.payload[12] = { key: "countryImageUrl_3", value: "" };
    }
    if (data.countryDescription) {
      const countryDescriptions = data.countryDescription.split("; ");
      if (countryDescriptions[0]) {
        body.payload[7] = {
          key: "countryDescriptions_1",
          value: countryDescriptions[0],
        };
      } else {
        body.payload[7] = { key: "countryDescriptions_1", value: "" };
      }
      if (countryDescriptions[1]) {
        body.payload[10] = {
          key: "countryDescriptions_2",
          value: countryDescriptions[1],
        };
      } else {
        body.payload[10] = { key: "countryDescriptions_2", value: "" };
      }
      if (countryDescriptions[2]) {
        body.payload[13] = {
          key: "countryDescriptions_3",
          value: countryDescriptions[2],
        };
      } else {
        body.payload[13] = { key: "countryDescriptions_3", value: "" };
      }
    } else {
      body.payload[7] = { key: "countryDescriptions_1", value: "" };
      body.payload[10] = { key: "countryDescriptions_2", value: "" };
      body.payload[13] = { key: "countryDescriptions_3", value: "" };
    }
  }

  return body;
}
