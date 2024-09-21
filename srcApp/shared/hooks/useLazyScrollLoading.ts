import { useState, useRef, useCallback } from "react";

export const useLazyScrollLoading = (
  initialMaxCount: number,
  productsLength: number,
  addStep: number
): [(node: HTMLElement | null) => void, number] => {
  const [maxCount, setMaxCount] = useState<number>(initialMaxCount);
  const observer = useRef<IntersectionObserver | null>(null);

  const refContainer = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && maxCount < productsLength) {
          setMaxCount((count) => count + addStep);
        }
      });
      if (node) observer.current.observe(node);
    },
    [maxCount, productsLength, addStep]
  );

  return [refContainer, maxCount];
};
