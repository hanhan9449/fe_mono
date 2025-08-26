import { describe, expect, it, test } from '@rstest/core';
// import * as lib from '../src';
import { FooInterface } from './foo.interface';
import { Injectable, Singleton, Lazy, type LazyableType, simpleContainer } from '../src';

@Injectable()
class Class1 {}

@Injectable()
class Class2 {}

@Singleton()
@Injectable()
class Singleton1 {}

@Injectable()
export class LazyWithoutForwardTo {
  name = 'lazy'
  sayName(prefix: string) {
    return `(${prefix}):(${this.name})`
  }
}

@Injectable()
export class Container1 {
  constructor(
    @Lazy(LazyWithoutForwardTo) public lazyWithoutForwardTo: LazyableType<LazyWithoutForwardTo>
  ) {}
}

@Injectable()
class ParentClass {
  constructor(
    public class1: Class1,
    public class2: Class2,
    public singleton1: Singleton1,
    public singleton2: Singleton1,
    @Lazy(FooInterface) public foo: LazyableType<FooInterface>,
  ) {}

  sayHi() {
    console.log(this.foo)
    this.foo.hello()
  }
}

@Injectable()
class PPClass {
  constructor(
    public parentClass: ParentClass,
    public singleton1: Singleton1,
  ) {}
}

describe('lib testing suite', () => {
  describe('base', () => {
    it('should work nice', () => {
      const instance = simpleContainer.resolve(ParentClass);
      expect(instance).instanceOf(ParentClass);
      expect(instance.class1).instanceOf(Class1);
      expect(instance.class2).instanceOf(Class2);
    });

    test('singleton work nice', () => {
      const instance = simpleContainer.resolve(ParentClass);
      const ppclass = simpleContainer.resolve(PPClass);
      expect(ppclass.singleton1).toEqual(instance.singleton1);
      expect(instance.singleton1).toEqual(instance.singleton2);
    });

  });
  describe('forward', () => {
    test('forwardTo work nice', () => {
      const instance = simpleContainer.resolve(ParentClass)
      const nameGetter = instance.foo.name
      const helloMethodGetter = instance.foo.hello
      expect(nameGetter).instanceOf(Function)
      expect(helloMethodGetter).instanceOf(Function)
      expect(nameGetter()).resolves.toEqual('foo')
      expect(helloMethodGetter()).resolves.toEqual('hello: foo')
      // expect(helloMethodPromise).resolves.toBe(Function)
      
    })

    test('Lazy without forwardTo work nice', () => {
      const instance = simpleContainer.resolve(Container1)
      const namePromise = instance.lazyWithoutForwardTo.name()
      const sayNamePromise = instance.lazyWithoutForwardTo.sayName('hello')
      expect(namePromise).resolves.toEqual('lazy')
      expect(sayNamePromise).resolves.toEqual('(hello) (lazy)')
    })

  })
});
