import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    revalidateTag("userByCookies");
    console.log("Cache userByCookies revalidated ");

    return new Response(null, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
