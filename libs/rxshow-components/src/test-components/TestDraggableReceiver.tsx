import { DraggableReceiver } from "../components/DraggableReceiver";

interface TestDraggableReceiverProps {
    itemId: string
}
export function TestDraggableReceiver(props: TestDraggableReceiverProps) {
    return <div>
        <div>{props.itemId}</div>
        <DraggableReceiver containerStyle={{minHeight: 30, minWidth: 30, border: '1px solid black', padding: 4}}/>
        </div>
}