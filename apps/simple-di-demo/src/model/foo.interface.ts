import { ForwardTo, Injectable } from '@aha/simple-di';

@Injectable()
@ForwardTo(() => import('./foo').then((it) => it.FooImpl))
export class FooInterface {
  name: string;
  hello() {
    throw new Error('NOT IMPLEMENT!')
  }
}
