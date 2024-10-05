import * as z from "zod";

export const validationSchema = z.object({
  name: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 2, {
      message: "Name must be at least 2 characters",
    }),
  password: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 2, {
      message: "Name must be at least 2 characters",
    }),
  icon: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: "Icon must be a valid URL",
    }),
  permissions: z.string(),
  registrationSources: z.string(),
  instagramUrl: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: "Instagram URL must be a valid URL",
    }),
  twitterUrl: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: "Twitter URL must be a valid URL",
    }),
  mainTextContent: z.string().optional(),
  countryName: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 2, {
      message: "Country name must be at least 2 characters",
    }),
  countryImageUrl: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: "Country image URL must be a valid URL",
    }),
  countryDescription: z.string().optional(),
  yourPhotoUrl: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: "Your photo URL must be a valid URL",
    }),
  aboutYourself: z.string().optional(),
});
