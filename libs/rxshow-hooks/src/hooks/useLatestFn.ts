import { AnyFn } from "@hanhan9449/common-types";
import { useCallback, useRef } from "react";

export function useLatestFn<F extends AnyFn>(fn: F): F {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const dummyFn = ((...args) => {
    return fnRef.current(...args);
  }) as F;
  return useCallback(dummyFn, []);
}
