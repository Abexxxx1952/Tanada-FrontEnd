import { UserLoginFormData } from "./types";

export function transformZodErrors(zodErrors: {
  email?: string[];
  password?: string[];
}): Partial<UserLoginFormData> {
  const errors: Partial<UserLoginFormData> = {};
  if (zodErrors.email) {
    errors.email = zodErrors.email[0];
  }
  if (zodErrors.password) {
    errors.password = zodErrors.password[0];
  }
  return errors;
}
