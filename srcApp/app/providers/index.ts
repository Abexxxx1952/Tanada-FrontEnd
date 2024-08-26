import compose from "compose-function";

import { withParallax } from "./withParallax";
import { withLayout } from "./withLayout";

export const withProviders = compose(withParallax, withLayout);
