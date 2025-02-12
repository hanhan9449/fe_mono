import { RefObject, useRef } from "react"
import { MarbleItemType } from "../types"
import { BehaviorSubject } from 'rxjs'
import {useInjectWidth} from '@hanhan9449/rxshow-hooks'
import { DraggableItem, ViewItem } from "./MarbleItem"
import styles from './MarbleContainer.module.scss'

type ContainerProps = {
    itemList: MarbleItemType[]
    itemListSubjectRef?: RefObject<BehaviorSubject<MarbleItemType[]>>
    draggable?: boolean
}

export function MarbleContainer(props: ContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    useInjectWidth(containerRef)

    function handleItemUpdate(item: MarbleItemType) {
        props.itemListSubjectRef?.current.next(
            props.itemListSubjectRef?.current?.value?.map(it => {
                if (it.id === item.id) {
                    return item
                }
                return it
            })
        )
    }

    function renderItemList() {
        if (props.draggable) {
            return (
                <>
                {props.itemList.map(it => {
                    return <DraggableItem key={it.id} item={it} onUpdate={handleItemUpdate} />
                })}
                </>
            )
        } else {
            return (<>
            {props.itemList.map(it => {
                return <ViewItem key={it.id} item={it}/>
            })}
            </>)
        }
    }

    return (
        <div className={styles['content-outer']}>
            <div className={styles['content']} ref={containerRef}>
            {renderItemList()}
            </div>
        </div>
    )
}