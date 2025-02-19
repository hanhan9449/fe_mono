import { SenderItemDataType } from "@hanhan9449/common-types";
import { useDraggableReceiver, useLatestFn, useReceiverIdRef } from "@hanhan9449/rxshow-hooks";
import { CSSProperties, useRef, useState } from "react";
import { DraggableSender } from "./DraggableSender";

export interface DraggableReceiverProps {
    containerStyle?: CSSProperties
}
export function DraggableReceiver<T extends any>(props: DraggableReceiverProps) {
    type Item = SenderItemDataType<T>
    const [item, setItem] = useState<Item>()
    const receiverIdRef = useReceiverIdRef()
    const itemDropInCallback = useLatestFn((sendItem: Item) => {
        const newSendItem = {...sendItem};
        newSendItem.receiverId = receiverIdRef.current
        setItem(newSendItem)
    })
    const itemDropOutCallback = useLatestFn((_sendItem: Item) => {
        setItem(undefined)
    })
    const ref = useRef<HTMLDivElement>(null)
    useDraggableReceiver<T>(ref, {
        receiverId: receiverIdRef.current,
        itemDropInCallback,
        itemDropOutCallback
    })
    return <div ref={ref} style={props.containerStyle}>
        {item && <DraggableSender key={`${item.receiverId}@${item.itemId}@${item.itemType}`} sendItem={item}/>}
    </div>
}