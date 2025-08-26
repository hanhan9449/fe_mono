export interface Type<T> {
    new (...args: any[]): T
}
export type ForwardToFactory = () => Promise<Type<any>>

export type LazyableType<T> = {
    [P in keyof T]: T[P] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<Awaited<R>>
    : () => Promise<Awaited<T[P]>>
}