---
title: "自己给自己出的 Promise 题"
author: "hanhan.rich"
description: "自己给自己出的 Promise 题"
pubDate: "2021.03.31"
---

## 这是题目

> https://runkit.com/hanhan9449/promise-with-async

```javascript
async function f() {
  console.log(1);
  await new Promise((resolve) => {
    console.log(7);
    setTimeout(() => console.log(2));
    resolve();
  }).then(() => console.log(8));
  console.log(3);
}

console.log(5);
f().then(() => console.log(4));
console.log(6);
```

答案：51768342

## 讲一讲我自己的理解

1. 主线程、setTimeout、setIntervel 为宏任务
2. Promise 的 then、catch 里面的回调函数是微任务
3. 事件循环中有两个队列，一个是任务(task)队列（宏任务队列）、一个是工作(job)队列（微任务队列）。
4. 每一个宏任务执行完成后会去运行微任务，直到微任务队列里面没有微任务。（也就是说如果一直有微任务就会一直执行微任务）
5. async 和 await 是一种语法糖，await 后面放 promise，则会同步执行后面的任务，然后将 async 下面的语句包装成 then 里面的回调函数函数。

所以首先打印了主线程中的`5`。

然后进入 f 函数，打印了`1`，然后打印了`7`。

setTimeout 会将回调函数放入宏任务队列中，then 会将回调函数放在微任务队列中。

async，await 语法糖会将下面的语句包装成回调函数，放入微任务队列中。

然后打印了主线程的`6`。

然后主线程执行完了，开始执行所有微任务。

打印了`8`、`3`、`4`。

微任务执行完了，开始执行下一个宏任务，打印了`2`。
