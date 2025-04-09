import {useEffect, useRef, useState} from "react";

export function useStateWithLocalStorage<T>(initData: T, identifier: string) {
    const [state, setState] = useState<T>(initData);
    const realKey = `useStateWithLocalStorage:${location.host}:${identifier}`
    const isMountRef = useRef(true)
    useEffect(() => {
        if (isMountRef.current) {


        try {


            setState(JSON.parse(localStorage.getItem(realKey)!))
        } catch (e) {
            console.error('useStateWithLocalStorage:', e);
        }
        isMountRef.current = false
        } else {
            localStorage.setItem(realKey, JSON.stringify(state))
        }
    }, [state]);
    return [state, setState]
}