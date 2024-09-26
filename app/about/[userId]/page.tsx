import { AboutWithUserPage } from "@/srcApp/pages/about";

export default function Page({ params }: { params: { userId: string } }) {
  return <AboutWithUserPage userId={params.userId} />;
}
