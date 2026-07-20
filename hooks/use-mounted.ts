import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Returns true only after the client has hydrated — avoids theme/SSR mismatches without an effect. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
