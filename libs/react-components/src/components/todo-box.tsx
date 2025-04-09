import { BoxProps } from "../interfaces";
import {} from '@hanhan9449/common-utils'
import { BoxImplManager } from "../utils/boxImplManager";
export function BoxTodo(props: BoxProps) {
    return <span style={{background: 'red'}}>TODO:{props.data?.type}</span>
}
export function isDev() {
    // @ts-ignore
    return import.meta.env.DEV
}
export function registerTodoBoxImpl() {
    if (import.meta.env.DEV) {
        BoxImplManager.getInstance().registerFallbackBoxImpl(BoxTodo)
    }
}