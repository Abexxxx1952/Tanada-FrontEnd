import { fetchAllUserData } from "@/srcApp/entities/user/api/fetchAllUserData";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let userEntries: MetadataRoute.Sitemap = [];
  const userOrError = await fetchAllUserData();
  if (
    !isErrorData(userOrError) &&
    userOrError !== undefined &&
    Array.isArray(userOrError)
  ) {
    userEntries = userOrError.flatMap((user) => [
      {
        url: `${process.env.SITE_URL}/${user.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${process.env.SITE_URL}/travels/${user.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${process.env.SITE_URL}/about/${user.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${process.env.SITE_URL}/stats/${user.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
    ]);
  }

  return [
    {
      url: `${process.env.SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${process.env.SITE_URL}/travels`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.SITE_URL}/stats`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    ...userEntries,
  ];
}
