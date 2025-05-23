---
title: "关于 Promise 的三两事"
author: "hanhan.rich"
description: "关于 Promise 的三两事"
pubDate: "2021.03.31"
---

Promise 是 javascript 实现异步的一种方式

## 基本的东西

- Promise 有三个状态，pending、fulfilled、rejected。

- Promise 的状态不可反转。

- Promise 属于微任务(job)

## Promise 的常用方法

- Promise#resolve

  直接返回一个 fulfilled 的 Promise

- Promise#reject

  直接返回一个 rejected 的 Promise

- Promise#all
- Promise#any
- Promise#race

## Promise 穿透现象

.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。

```javascript
Promise.resolve(1)
  .then(2)
  .then(3)
  .then((it) => console.log(it));
// 1
```

## 实现一个 Promise

<!-- TODO: 实现一个Promise -->
