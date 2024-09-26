import { StatsWithUserPage } from "@/srcApp/pages/stats";

export default function Page({ params }: { params: { userId: string } }) {
  return <StatsWithUserPage userId={params.userId} />;
}
