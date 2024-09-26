import { fetchUserDataById } from "@/srcApp/entities/user/api/fetchUserDataById";
import { MainWithUserPage } from "@/srcApp/pages/main";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}) {
  const user = await fetchUserDataById(params.userId);
  return {
    title: `Main ${user?.email}`,
    description: `${user?.email} photos`,
  };
}

export default function Page({ params }: { params: { userId: string } }) {
  return <MainWithUserPage userId={params.userId} />;
}
