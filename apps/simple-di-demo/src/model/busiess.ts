import { Injectable, Lazy, type LazyableType } from "@ahajs/simple-di";
import { FooInterface } from "./foo.interface";

@Injectable()
export class Bar {
    constructor(@Lazy(FooInterface) public foo: LazyableType<FooInterface>) {
        console.log(1)
    }
}

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