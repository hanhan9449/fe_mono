import { useRef } from "react";
import {nanoid} from 'nanoid'

export function useReceiverIdRef() {
    const ref = useRef(nanoid())
    return ref
}