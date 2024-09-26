import { fetchUserDataById } from "@/srcApp/entities/user/api/fetchUserDataById";
import { AboutWithUserPage } from "@/srcApp/pages/about";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}) {
  const user = await fetchUserDataById(params.userId);
  return {
    title: `About ${user?.email}`,
    description: `About ${user?.email}`,
  };
}

export default function Page({ params }: { params: { userId: string } }) {
  return <AboutWithUserPage userId={params.userId} />;
}
