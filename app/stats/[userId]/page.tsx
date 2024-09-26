import { fetchUserDataById } from "@/srcApp/entities/user/api/fetchUserDataById";
import { StatsWithUserPage } from "@/srcApp/pages/stats";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}) {
  const user = await fetchUserDataById(params.userId);
  return {
    title: `Stats ${user?.email}`,
    description: `${user?.email} stats`,
  };
}

export default function Page({ params }: { params: { userId: string } }) {
  return <StatsWithUserPage userId={params.userId} stats="" />;
}
