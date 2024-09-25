import { MainWithUserPage } from "@/srcApp/pages/main";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tanada",
  description: "Travel Blog",
  icons: "/icons/logo.svg",
};

export default function Page({ params }: { params: { userId: string } }) {
  return <MainWithUserPage userId={params.userId} />;
}
