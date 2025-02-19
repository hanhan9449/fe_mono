import { SenderItemDataType } from "@hanhan9449/common-types"
import { RefObject, useEffect } from "react";
import {  fromEvent, map, merge, withLatestFrom } from "rxjs";
import { dragStartSendItem$, globalDrop$ } from "../utils/useDraggable.util";

export type UseDraggableReceiverConfigType<T> = {
    itemDropInCallback?: (sendItem: SenderItemDataType<T>) => void;
    itemDropOutCallback?: (sendItem: SenderItemDataType<T>) => void;
    receiverId: string
}

export function useDraggableReceiver<T extends any>(elRef: RefObject<HTMLElement | null>, config: UseDraggableReceiverConfigType<T>) {
    useEffect(() => {
        const el = elRef.current
        if (!el) {
            return 
        }
        const drop$ = fromEvent(el, 'drop')
        const dragOver$ = fromEvent(el, 'dragover')
        const dragLeave$ = fromEvent(el, 'dragleave')


        merge(drop$, dragOver$, dragLeave$).subscribe(e => e.preventDefault())
        const dropSendItem$ = drop$.pipe(
            map((dropEvent: any) => {
                const sendItem = JSON.parse(dropEvent.dataTransfer.getData('application/json'))
                return sendItem as SenderItemDataType<any>
            })
        )
        globalDrop$.pipe(withLatestFrom(dragStartSendItem$)).subscribe(([a,b]) => {
            if (b.receiverId === config.receiverId) {
                config.itemDropOutCallback?.(a)
            }
        })
        dropSendItem$.subscribe((it: SenderItemDataType<any>) => {
            config?.itemDropInCallback?.(it)
            globalDrop$?.next(it)
        })
    }, [elRef])
}