import { MainWithOutUserPage } from "@/srcApp/pages/main";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Tanada Travel Blog", template: "%s | Tanada Travel Blog" },
  description: "Travel Blog",
  icons: "/icons/logo.svg",
};

export default MainWithOutUserPage;
