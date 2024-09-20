import compose from "compose-function";

import { withParallax } from "./withParallax";
import { withLayout } from "./withLayout";
import { withContextProvider } from "./withContext";

export const withProviders = compose(
  withContextProvider,
  withParallax,
  withLayout
);
