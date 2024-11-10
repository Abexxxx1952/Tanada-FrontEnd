import dynamic from "next/dynamic";
import { BaseLayout } from "@/srcApp/widgets/base-layout";
import { Header } from "@/srcApp/widgets/header";
import type { AppType } from "../app";
import { PropsWithChildren } from "react";

const Footer = dynamic(() =>
  import("@/srcApp/widgets/footer/ui").then((mod) => mod.Footer)
);

export const withLayout =
  (App: AppType) =>
  ({ children }: PropsWithChildren) => {
    return (
      <BaseLayout>
        <Header />
        <App>{children}</App>
        <Footer />
      </BaseLayout>
    );
  };
