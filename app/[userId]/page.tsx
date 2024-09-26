import { MainWithUserPage } from "@/srcApp/pages/main";

export default function Page({ params }: { params: { userId: string } }) {
  return <MainWithUserPage userId={params.userId} />;
}
