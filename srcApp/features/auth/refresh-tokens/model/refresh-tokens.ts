"use server";
import { cookies } from "next/headers";
import { JwtRefreshTokenType } from "../../cookies/model/types";
import { ErrorData } from "@/srcApp/features/user/model/types";
import { setCookies } from "../../cookies/model/setCookies";

export async function refreshTokens<T extends (...args: any) => any>(
  refresh_token: string,
  func: T
): Promise<ReturnType<T>> {
  const response = await fetch(`${process.env.GET_TOKENS_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh_token}`,
    },
  });

  if (!response.ok) {
    const errorData: ErrorData = await response.json();
    throw errorData;
  }
  const data: JwtRefreshTokenType = await response.json();
  if (data.access_token && data.refresh_token) {
    await setCookies(data.access_token, data.refresh_token);
  }

  return await func();
}
