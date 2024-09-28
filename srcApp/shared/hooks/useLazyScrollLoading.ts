import { useState, useRef, useEffect } from "react";

export const useLazyScrollLoading = (
  initialMaxCount: number,
  productsLength: number,
  addStep: number,
  lastElementRef: React.RefObject<HTMLElement>
): number => {
  const [maxCount, setMaxCount] = useState<number>(initialMaxCount);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (lastElementRef && lastElementRef.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && maxCount < productsLength) {
          setMaxCount((count) => count + addStep);
        }
      });

      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [lastElementRef, maxCount, productsLength, addStep]);

  return maxCount;
};
