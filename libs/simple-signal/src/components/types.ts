import { type Signal } from "./signal";

export type EffectType = () => void;
export type ReadonlySignal<T> = Readonly<Signal<T>>
export type EffectTypeMetadata = {
    type: 'asap' | 'async'
}