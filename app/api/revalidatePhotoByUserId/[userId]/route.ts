import { revalidateTag } from "next/cache";

export async function GET(
  request: Request,
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
