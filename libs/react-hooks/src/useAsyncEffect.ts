import { useEffect } from "react";

export function useAsyncEffect(effect: () => Promise<void>, deps: any[] = []) {
    useEffect(() => {
        effect();
    }, deps);
}