import { MainWithOutUserPage } from "@/srcApp/pages/main";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.SITE_URL}`),
  title: { default: "Tanada Travel Blog", template: "%s | Tanada Travel Blog" },
  description: "Travel Blog",
  icons: "/icons/logo.svg",
  keywords: ["Travel", "Blog", "Tanada", "Tanada Travel Blog"],
  openGraph: {
    title: "Tanada Travel Blog",
    description: "Travel Blog",
    images: [
      {
        url: "/icons/logo.svg",
        width: 512,
        height: 512,
        alt: "Tanada",
      },
    ],
  },
};

export default MainWithOutUserPage;
