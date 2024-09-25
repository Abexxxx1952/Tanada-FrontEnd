import { AboutWithUserPage } from "@/srcApp/pages/about";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tanada",
  description: "Travel Blog",
  icons: "/icons/logo.svg",
};


export default function Page({ params }: { params: { userId: string } }) {
  return <AboutWithUserPage userId={params.userId} />;
}
