import { useEffect } from "react";

type KeyboardHandler = [
  key: string,
  callback: () => void,
  dependencies?: any[]
];

export function useKeyboardHandler(
  element: HTMLElement | null,
  handlers: KeyboardHandler[]
) {
  useEffect(() => {
    if (!element) {
      return;
    }

    const handleKeyboard = (event: KeyboardEvent) => {
      handlers.forEach(([key, callback]) => {
        if (event.key === key) {
          callback();
        }
      });
    };

    element.addEventListener("keydown", handleKeyboard);

    return () => {
      element.removeEventListener("keydown", handleKeyboard);
    };
  }, [
    element,
    ...handlers.flatMap(([_, __, dependencies]) => dependencies || []),
  ]);
}
