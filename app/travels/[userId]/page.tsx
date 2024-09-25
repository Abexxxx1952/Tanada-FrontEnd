import { TravelsWithUserPage } from "@/srcApp/pages/travels";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tanada",
  description: "Travel Blog",
  icons: "/icons/logo.svg",
};



export default function Page({ params }: { params: { userId: string } }) {
  return <TravelsWithUserPage userId={params.userId} />;
}
