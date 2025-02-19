import { SenderItemBaseProps } from "@hanhan9449/common-types";
import { useDraggableSender } from "@hanhan9449/rxshow-hooks";
import { useRef } from "react";
import { getDraggableSenderItem } from "../utils/DraggableSender.util";

export function DraggableSender<D>(props:SenderItemBaseProps<D>) {
    const ref = useRef<HTMLDivElement>(null)
    useDraggableSender(ref, {
        sendItem: props.sendItem
    })
    const Children = getDraggableSenderItem(props.sendItem.itemType)
    return <div ref={ref} style={{cursor: 'grab'}}>
        {Children && <Children sendItem={props.sendItem} />}
    </div>
}