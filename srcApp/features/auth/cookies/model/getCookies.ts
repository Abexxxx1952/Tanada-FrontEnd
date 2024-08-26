"use server";
import { cookies } from "next/headers";
import { JwtRefreshTokenType } from "./types";

export async function getCookies(): Promise<JwtRefreshTokenType> {
  const cookieStore = cookies();
  const access_token = cookieStore.get("Authentication_accessToken");
  const refresh_token = cookieStore.get("Authentication_refreshToken");
  return {
    access_token: access_token?.value,
    refresh_token: refresh_token?.value,
  };
}
