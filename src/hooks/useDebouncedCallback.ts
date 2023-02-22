import { useCallback, useRef } from "react";

export default function useDebouncedCallback(func: () => void, wait: number) {
  // Use a ref to store the timeout between renders
  // and prevent changes to it from causing re-renders
  const timeout = useRef<NodeJS.Timeout>();

  return useCallback(
    () => {
      const later = () => {
        clearTimeout(timeout.current);
        func();
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait]
  );
};
