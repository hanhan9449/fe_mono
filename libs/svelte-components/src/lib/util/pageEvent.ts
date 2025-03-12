import type { NoticeShowInput } from "$lib/type"

class PageEvent {
    private _key_to_callback_list = new Map<PageEventName, PickPageEventCallback<PageEventName>[]>()
    subscribe<T extends PageEventName>(eventName: T, callback: PickPageEventCallback<T>) {
        const list = this._key_to_callback_list.get(eventName) || []
        this._key_to_callback_list.set(eventName, [...list, callback])
    }
    emit<T extends PageEventName>(eventName: T, data: PageEventCallback[T]) {
        const list = this._key_to_callback_list.get(eventName) || []
        for (const cb of list) {
            cb(data)
        }
    }
    
}
export enum PageEventName {
    NOTICE_SHOW
}
type PageEventCallback = {
    [PageEventName.NOTICE_SHOW]: NoticeShowInput
}
type PickPageEventData<T extends PageEventName> = PageEventCallback[T]
type PickPageEventCallback<T extends PageEventName> = (a: PageEventCallback[T]) => void
export const defaultPageEvent = new PageEvent()