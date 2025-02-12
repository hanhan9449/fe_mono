import { useEffect, useRef, useState } from 'react'
import './App.css'
import {MarbleContainer, MarbleItemType} from '@hanhan9449/rxshow-components'
import { BehaviorSubject, from, map, switchMap, toArray } from 'rxjs'
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
  return (
    <div>
      <div>origin</div>
      <MarbleContainer draggable itemList={originList} itemListSubjectRef={originListSubjectRef}/>
      <div>track</div>
      <MarbleContainer  itemList={trackList}/>
    </div>
  )
}

export default App
