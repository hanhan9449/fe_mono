import { Injectable } from '../src';
import type { FooInterface } from './foo.interface';

@Injectable()
export class FooImpl implements FooInterface {
  name: string = 'foo';
  hello(): void {
    console.log(`hello: ${this.name}`);
  }
}
