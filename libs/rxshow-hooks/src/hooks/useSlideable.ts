import { RefObject, useEffect, useState } from "react";
import { animationFrameScheduler,  fromEvent, map, mergeMap, mergeScan, Observable, of, pairwise, subscribeOn, takeUntil  } from 'rxjs'
import {Nullable} from '@hanhan9449/common-types'

export type SlideEventType = {
    xPercent: number
    yPercent: number
}

export type SlideableConfigType = {
    slideType?: 'x' | 'y' | 'xy'
}
const defaultConfig: SlideableConfigType = {
    slideType: "xy"
}
function makeSlideable$(el: Nullable<HTMLElement>, config: SlideableConfigType = defaultConfig) {
    if (!el) {
        return of()
    }
    const mousedown$ = fromEvent(el, 'mousedown')
    const mousemove$ = fromEvent(document.body, 'mousemove')
    const mouseup$ = fromEvent(document.body, 'mouseup')
    const mouseleave$ = fromEvent(document.body, 'mouseleave')

    const initVars = getComputedStyle(el)
    const move$ = mousedown$.pipe(
        mergeMap(() => mousemove$.pipe(
            map((it: any) => {
                return ({x: it.pageX, y: it.pageY})
            }),
            pairwise(),
            map(([prev, curr]) => ({x: curr.x - prev.x, y: curr.y - prev.y})),
            subscribeOn(animationFrameScheduler),
            takeUntil((mouseup$)),
            takeUntil(mouseleave$)
        )),
        mergeScan((prev, curr) => {
            const vars = getComputedStyle(el)
            const contentWidth = Number(vars.getPropertyValue('--content-width')) || 0
            const contentHeight = Number(vars.getPropertyValue('--content-height')) || 0
            const itemWidth = Number(vars.getPropertyValue('--item-width')) || 0
            const itemHeight = itemWidth
            const maxTransformX = contentWidth - itemWidth
            const maxTransformY = contentHeight - itemHeight
            let nextX = prev.xPercent * maxTransformX
            let nextY = prev.yPercent * maxTransformY
            if (config?.slideType === 'x' || config?.slideType === 'xy') {
                nextX += curr.x
            }
            if (config?.slideType === 'y' || config?.slideType === 'xy') {
                nextY += curr.y
            }
            nextX = Math.min(maxTransformX, Math.max(0, nextX))
            nextY = Math.min(maxTransformY, Math.max(0, nextY))
            const res = {
                xPercent: maxTransformX === 0 ? 0 : nextX / maxTransformX,
                yPercent: maxTransformY === 0 ? 0 : nextY / maxTransformY,
            }
            return of(res)
        }, {xPercent: Number(initVars.getPropertyValue('--x-percent')), yPercent: Number(initVars.getPropertyValue('--y-percent'))})
    )
    return move$

}

export function useSlideable(elRef: RefObject<HTMLElement | null>, config: SlideableConfigType = defaultConfig) {
    const [move$, setMove$] = useState<Observable<SlideEventType>>()
    useEffect(() => {
        const el = elRef.current
        if (!el) {
            return
        }
        const _move$ = makeSlideable$(el, config)
        setMove$(_move$)
    }, [elRef])
    return move$
}

export function useInjectWidth(elRef: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const el = elRef.current
        if (!el) {
            return
        }
        const width = el.offsetWidth
        const height = el.offsetHeight
        el.style.setProperty('--content-width', String(width))
        el.style.setProperty('--content-height', String(height))
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries){
                const width = entry.contentRect.width
                const height = entry.contentRect.height
                ;(entry.target as HTMLElement).style.setProperty('--content-width', String(width))
                ;(entry.target as HTMLElement).style.setProperty('--content-height', String(height))
            }
        })
        resizeObserver.observe(el)
    }, [elRef])
}