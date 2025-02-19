import { SenderItemDataType } from "@hanhan9449/common-types";
import { RefObject, useEffect } from "react";
import { fromEvent } from "rxjs";
import { dragStartSendItem$ } from "../utils/useDraggable.util";

export type UseDraggableItemConfigType<T> = {
    sendItem: SenderItemDataType<T>
}

export function useDraggableSender<T>(elRef: RefObject<HTMLElement | null>, config: UseDraggableItemConfigType<T>) {
    useEffect(() => {
        const el = elRef.current
        if (!el) {
            return
        }
        el.setAttribute('draggable', 'true')
        const dragStart$ = fromEvent(el, 'dragstart')
        dragStart$.subscribe(( event: any ) => {
            event.dataTransfer.setData('application/json', JSON.stringify(config.sendItem))
            dragStartSendItem$.next(config.sendItem)
        })
    }, [elRef])
}
