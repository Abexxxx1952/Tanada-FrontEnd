import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { setCookies } from "@/srcApp/features/auth/cookies/model/setCookies";
import { revalidateTag } from "next/cache";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const access_token: string | null = searchParams.get("access_token");
  const refresh_token: string | null = searchParams.get("refresh_token");

  if (access_token && refresh_token) {
    (async () => {
      await setCookies(access_token, refresh_token);
      revalidateTag("userByCookies");
      revalidateTag("userAll");
      revalidateTag("userStats");
    })();
  }

  redirect("/");
}
