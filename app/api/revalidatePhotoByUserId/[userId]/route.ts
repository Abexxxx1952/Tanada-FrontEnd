import { type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { getUserDataForRevalidate } from "@/srcApp/shared/model/revalidate";
import { isErrorData } from "@/srcApp/shared/model/isErrorData";

export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  const access_token: string | undefined = request?.headers
    ?.get("authorization")
    ?.split(" ")[1];

  if (!access_token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const userDataOrError = await getUserDataForRevalidate(access_token);

    if (
      isErrorData(userDataOrError) ||
      userDataOrError === undefined ||
      userDataOrError.id !== userId
    ) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    revalidateTag(`photoById${userId}`);
    console.log(`Cache revalidated userID: ${userId}`);

    return new Response(null, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
