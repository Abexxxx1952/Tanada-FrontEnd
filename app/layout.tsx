import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { App } from "@/srcApp/app";

const font = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanada",
  description: "Travel blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.className}>
      <App>{children}</App>
    </html>
  );
}
