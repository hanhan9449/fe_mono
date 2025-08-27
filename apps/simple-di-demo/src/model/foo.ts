import { Injectable } from '@ahajs/simple-di';
import type { FooInterface } from './foo.interface';

@Injectable()
export class FooImpl implements FooInterface {
  name: string = 'foo';
  hello() {
    console.log(`hello: ${this.name}`);
    return 'world'
  }
}
