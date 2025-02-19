export type Nullable<T> = T | null
export type SenderItemBaseProps<D> = {
    sendItem: SenderItemDataType<D>
}

export type SenderItemDataType<D extends any> = {
    itemId: string
    itemType: string
    itemData: D
    receiverId?: string
}
export type AnyFn = (...args: any[]) => any