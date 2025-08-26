import { simpleContainer } from '@ahajs/simple-di';
import './App.css';
import { Bar, Container1 } from './model/busiess';
function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
async function main()  {
  const container1 = simpleContainer.resolve(Container1)
  console.log(container1)
  console.log(container1.lazyWithoutForwardTo.name())
  console.log(await container1.lazyWithoutForwardTo.sayName('prefix'))
  const bar = simpleContainer.resolve(Bar)
  console.log(bar)
  sleep(2000)
  console.log(await bar.foo.name())
  console.log(await bar.foo.hello())

}
main()

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
