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
class ParentClass {
  constructor(
    public class1: Class1,
    public class2: Class2,
    public singleton1: Singleton1,
    public singleton2: Singleton1,
    @Lazy(FooInterface) public foo: LazyableType<FooInterface>
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
      const namePromise = instance.foo.name
      const helloMethodPromise = instance.foo.hello
      expect(namePromise).instanceOf(Promise)
      expect(helloMethodPromise).instanceOf(Promise)
      expect(namePromise).resolves.toEqual('foo')
      // expect(helloMethodPromise).resolves.toBe(Function)
      
    })

  })
});
