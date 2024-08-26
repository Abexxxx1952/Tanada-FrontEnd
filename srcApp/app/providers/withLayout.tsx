import { BaseLayout } from "@/srcApp/widgets/base-layout";
import { Footer } from "@/srcApp/widgets/footer";
import { Header } from "@/srcApp/widgets/header";
import type { AppType } from "../app";
import { PropsWithChildren } from "react";

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
