import { Injectable, Lazy, type LazyableType } from "@aha/simple-di";
import { FooInterface } from "./foo.interface";

@Injectable()
export class Bar {
    constructor(@Lazy(FooInterface) public foo: LazyableType<FooInterface>) {
        console.log(1)
    }
}