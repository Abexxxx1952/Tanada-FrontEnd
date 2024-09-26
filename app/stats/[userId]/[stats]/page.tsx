import { Metadata } from "next";
import { StatsWithUserPage } from "@/srcApp/pages/stats";

export const metadata: Metadata = {
  title: "My stats",
  description: "Travel Blog | My stats",
  icons: "/icons/logo.svg",
};

export default function Page({
  params,
}: {
  params: { userId: string; stats: string };
}) {
  return <StatsWithUserPage userId={params.userId} stats={params.stats} />;
}
