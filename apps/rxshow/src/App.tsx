import { useEffect, useRef, useState } from 'react'
import './App.css'
import {DraggableSender, MarbleContainer, MarbleItemType, registerAllTestComponent, TestConstantSendDataType, TestDraggableReceiver} from '@hanhan9449/rxshow-components'
import { BehaviorSubject, from, map, switchMap, toArray } from 'rxjs'
import { SenderItemDataType } from '../../../libs/common-types/src/types'


registerAllTestComponent()

function App() {
  const originListSubjectRef = useRef<BehaviorSubject<MarbleItemType[]>>(
    new BehaviorSubject<MarbleItemType[]>([
    {
      id: '1',
      itemName: 'A',
      xPercent: 0.1,
      yPercent: 0,
      color: 'red'
    },
    {
      id: '2',
      itemName: 'B',
      xPercent: 0.3,
      yPercent: 0,
      color: 'blue'
    },
    {
      id: '3',
      itemName: 'C',
      xPercent: 0.6,
      yPercent: 0,
      color: 'green'
    },
    ])
  )
  const [originList, setOriginList]= useState<MarbleItemType[]>([])
  const [trackList, setTrackList]= useState<MarbleItemType[]>([])
  useEffect(() => {
    originListSubjectRef.current.subscribe(it => setOriginList(it))
    originListSubjectRef.current.pipe(
      switchMap(it => from(it).pipe(
        map(it => {
          const next = {...it}
          next.itemName += 't'
          return next
        }),
        toArray()
      ))
    ).subscribe(it => setTrackList(it))
  }, [])
  const [senderList] = useState<SenderItemDataType<TestConstantSendDataType>[]>([
    {
      itemData: {background: 'red', value: 1},
      itemId: '1',
      itemType: 'test-contant'
    },
    {
      itemData: {background: 'blue', value: 2},
      itemId: '2',
      itemType: 'test-contant'
    },
  ]) 
  return (
    <div>
      <h2>Rx Marble Test</h2>
      <div>origin</div>
      <MarbleContainer draggable itemList={originList} itemListSubjectRef={originListSubjectRef}/>
      <div>track</div>
      <MarbleContainer  itemList={trackList}/>
      <h2>Draggable Test</h2>
      <div>draggable data</div>
      <div>
        {senderList.map(it => {
          return <DraggableSender key={it.itemId} sendItem={it}/>
        })}
      </div>
      <div>
        <TestDraggableReceiver itemId={'receiver1'} />
        <TestDraggableReceiver itemId={'receiver2'} />
        <TestDraggableReceiver itemId={'receiver3'} />
      </div>
    </div>
  )
}

export default App
