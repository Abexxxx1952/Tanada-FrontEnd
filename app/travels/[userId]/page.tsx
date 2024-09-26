import { fetchUserDataById } from "@/srcApp/entities/user/api/fetchUserDataById";
import { TravelsWithUserPage } from "@/srcApp/pages/travels";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}) {
  const user = await fetchUserDataById(params.userId);
  return {
    title: `Travels ${user?.email}`,
    description: `${user?.email} travels`,
  };
}

export default function Page({ params }: { params: { userId: string } }) {
  return <TravelsWithUserPage userId={params.userId} />;
}
