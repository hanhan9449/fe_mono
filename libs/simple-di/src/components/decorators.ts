import { simpleContainer } from "./container";
import { INJECTABLE_TOKEN, IS_SINGLETON_TOKEN, LAZY_TYPE_LIST_TOKEN, PROVIDE_ID_TOKEN } from "./token";
import { ForwardToFactory,  Type } from "./type";

export function Injectable() {
    return function (target: Type<any>) {
        Reflect.defineMetadata(INJECTABLE_TOKEN, true, target)
    }
}

function addProvideId(type: Type<any>) {
    const provideId = Reflect.getMetadata(PROVIDE_ID_TOKEN, type)
    if (provideId) {
        return provideId
    }
    const newId = Math.random().toString()
    Reflect.defineMetadata(PROVIDE_ID_TOKEN, newId, type)
    return newId
}

export function Provide<T extends Type<any>, By extends T>(Type: T, by: By) {
    return function (target: Type<any>) {
        const id = addProvideId(target)
        simpleContainer.registerCustomProvider(id, target, by)
    }
}

export function Singleton() {
    return function (target: Type<any>) {
        Reflect.defineMetadata(IS_SINGLETON_TOKEN, true, target)
    }
}

export function ForwardTo(factory: ForwardToFactory) {
    return function (target: Type<any>) {
        simpleContainer.registerForwardProvider(target, factory)
    }
}

export function Lazy(type: Type<any>) {
    return function (target: Type<any>, propertyKey: any, parameterIndex: number) {
        const lazyTypeList = Reflect.getMetadata(LAZY_TYPE_LIST_TOKEN, target) || []
        lazyTypeList[parameterIndex] = type
        Reflect.defineMetadata(LAZY_TYPE_LIST_TOKEN, lazyTypeList, target)

        console.log(46,Reflect.getMetadata(LAZY_TYPE_LIST_TOKEN, target), target)
    }
}