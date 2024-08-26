import { PropsWithChildren } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import type { AppType } from "../app";

export const withParallax =
  (App: AppType) =>
  ({ children }: PropsWithChildren) => {
    return (
      <ParallaxProvider>
        <App>{children}</App>
      </ParallaxProvider>
    );
  };
