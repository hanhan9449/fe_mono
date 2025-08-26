import 'reflect-metadata';
import type { ForwardToFactory, Type } from './type';
import {
  DESIGN_PARAM_TYPES_TOKEN,
  INJECTABLE_TOKEN,
  IS_SINGLETON_TOKEN,
  LAZY_TYPE_LIST_TOKEN,
  PROVIDE_ID_TOKEN,
} from './token';

class Container {
  private readonly customProviders = new Map<string, Map<Type<any>, any>>();
  private readonly singletonMap = new Map<Type<any> | ForwardToFactory, any>();
  private readonly forwardProviders = new Map<Type<any>, ForwardToFactory>();

  private resolveType(
    target: Type<any> | ForwardToFactory,
    provideId: string = 'root',
  ) {
    let type = target;
    if (typeof type === 'function') {
      return type;
    }

    const customType = this.customProviders.get(provideId)?.get?.(type);
    if (customType) {
      type = customType;
    }
    if (!Reflect.getMetadata(INJECTABLE_TOKEN, type)) {
      throw new Error(`Dependency not registered: ${String(target)}`);
    }
    return type;
  }

  private resolveSingleton(type: Type<any> | ForwardToFactory) {
    const isSingleton = Reflect.getMetadata(IS_SINGLETON_TOKEN, type);
    if (isSingleton && this.singletonMap.has(type)) {
      return this.singletonMap.get(type);
    }
  }

  private registerSingleton(type: Type<any> | ForwardToFactory, instance: any) {
    const isSingleton = Reflect.getMetadata(IS_SINGLETON_TOKEN, type);
    if (isSingleton) {
      this.singletonMap.set(type, instance);
    }
  }

  private resolveAsync(
    factory: Type<any> | ForwardToFactory,
    parentProvideId: string,
  ) {
    let instance: any;
    const isTypeUtil = (a: typeof factory): a is Type<any> =>
      typeof a?.prototype?.constructor === 'function';

    const handler = {
      get: (target: Type<any>, property: any, receiver: any) => {
        const getter = (...params: any[]) => {
          return new Promise(async (resolve) => {
            if (!instance) {
              const type = isTypeUtil(factory) ? factory : await factory();
              const paramTypes: any[] =
                Reflect.getMetadata(DESIGN_PARAM_TYPES_TOKEN, type) || [];
              const provideId = Reflect.getMetadata(PROVIDE_ID_TOKEN, type);
              const injections = [];
              const lazyLoadList =
                Reflect.getMetadata(LAZY_TYPE_LIST_TOKEN, type) || [];
              for (let i = 0; i < paramTypes.length; ++i) {
                let paramType = paramTypes[i];
                const lazyLoadFactory =
                  this.forwardProviders.get(lazyLoadList[i]) || lazyLoadList[i];
                if (lazyLoadFactory) {
                  paramType = lazyLoadFactory;
                }
                const instance = this.resolve(
                  paramType,
                  provideId,
                  !!lazyLoadFactory,
                );
                injections.push(instance);
              }
              instance = new type(...injections);
            }
            const value = instance[property];
            if (value?.apply) {
              const result = await value.apply(instance, params);
              resolve(result);
              return;
            } else {
              resolve(value);
            }
          });
        };
        return getter;
      },
    };
    const proxy = new Proxy({} as any, handler);
    return proxy;
  }

  private resolveSync(type: Type<any>, parentProvideId: string) {
    const paramTypes: any[] =
      Reflect.getMetadata(DESIGN_PARAM_TYPES_TOKEN, type) || [];
    const provideId = Reflect.getMetadata(PROVIDE_ID_TOKEN, type);
    const injections = [];
    const lazyLoadList = Reflect.getMetadata(LAZY_TYPE_LIST_TOKEN, type) || [];
    for (let i = 0; i < paramTypes.length; ++i) {
      let paramType = paramTypes[i];
      const lazyLoadFactory =
        this.forwardProviders.get(lazyLoadList[i]) || lazyLoadList[i];
      if (lazyLoadFactory) {
        paramType = lazyLoadFactory;
      }
      const instance = this.resolve(paramType, provideId, !!lazyLoadFactory);
      injections.push(instance);
    }

    let instance = new type(...injections);
    this.registerSingleton(type, instance);
    return instance;
  }

  public resolve<T>(
    target: Type<T> | ForwardToFactory,
    parentProvideId: string = 'root',
    isLazyLoad = false,
  ): T {
    const type = this.resolveType(target, parentProvideId);
    const isNotLazyLoadUtil = (a: typeof type): a is Type<any> => !isLazyLoad;
    const singleton = this.resolveSingleton(type);
    if (singleton) {
      return singleton;
    }

    if (isNotLazyLoadUtil(type)) {
      let instance = this.resolveSync(type, parentProvideId);
      this.registerSingleton(type, instance);
      return instance;
    } else {
      let instance = this.resolveAsync(type, parentProvideId);
      this.registerSingleton(type, instance);
      return instance;
    }
  }

  public registerCustomProvider<T extends Type<any>, By extends T>(
    id: string,
    target: T,
    by: By,
  ) {
    const provideMap = this.customProviders.get(id) || new Map();
    provideMap.set(target, by);
    this.customProviders.set(id, provideMap);
  }

  public registerForwardProvider<
    T extends Type<any>,
    F extends ForwardToFactory,
  >(type: T, factory: F) {
    this.forwardProviders.set(type, factory);
  }
}

export const simpleContainer = new Container();
