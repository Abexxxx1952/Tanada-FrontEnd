import { type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    revalidateTag("userByCookies");
    console.log("Cache userByCookies revalidated ");

    return new Response(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
