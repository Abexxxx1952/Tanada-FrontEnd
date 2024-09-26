import { TravelsWithUserPage } from "@/srcApp/pages/travels";

export default function Page({ params }: { params: { userId: string } }) {
  return <TravelsWithUserPage userId={params.userId} />;
}
