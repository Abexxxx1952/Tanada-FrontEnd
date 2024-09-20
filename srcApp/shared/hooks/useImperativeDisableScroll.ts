import { useEffect } from "react";

export function useImperativeDisableScroll<T>(
  element: HTMLElement | null,
  disabled: boolean
) {
  useEffect(() => {
    if (!element) {
      return;
    }

    element.style.overflowY = disabled ? "hidden" : "scroll";

    return () => {
      element.style.overflowY = "scroll";
    };
  }, [disabled]);
}
