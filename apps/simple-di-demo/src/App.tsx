import { simpleContainer } from '@aha/simple-di';
import './App.css';
import { Bar } from './model/busiess';
function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
async function main()  {
  const bar = simpleContainer.resolve(Bar)
  console.log(bar)
  await sleep(5000)
  console.log(bar.foo.name)
  console.log(await bar.foo.name)
  ;(await bar.foo.hello)()
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
