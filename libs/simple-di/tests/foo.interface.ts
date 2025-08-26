import * as lib from '../src';
import { ForwardTo, Injectable } from '../src';

@Injectable()
@ForwardTo(() => import('./foo').then((it) => it.FooImpl))
export class FooInterface {
  name: string;
  hello() {
    throw new Error('NOT IMPLEMENT!')
  }
}
