import { type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  try {
    revalidateTag(`photoById${userId}`);
    console.log(`Cache revalidated userID: ${userId}`);

    return new Response(null, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
