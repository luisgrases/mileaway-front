import { useCallback, useState } from "react";

/**
 * An utility hook, that allows to imperatively call rerender of the
 * component
 */
export const useRerender = (): (() => void) => {
  const [_, rerender] = useState({});

  return useCallback(() => rerender({}), []);
};
