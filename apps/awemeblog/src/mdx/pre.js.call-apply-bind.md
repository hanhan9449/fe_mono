---
title: "实现 call apply bind"
author: "hanhan.rich"
description: "实现 call apply bind"
pubDate: "2021.03.31"
---

## 前言

我们可以使用 call apply 来调用一个函数，改变 this 的指向，也可以使用 bind 来给这个函数硬绑定一个 this。

## myCall

call 和 apply 的区别在于 call 后面传递的是若干个参数，apply 传递的是一个数组。

因此我们实现了 myCall 就实现了 myApply。

```javascript
Function.prototype.myCall = function (that, ...params) {
  // 使用Symbol来确保key的唯一
  const symbol = Symbol();
  that[symbol] = this;
  let ret = that[symbol](...params);
  // 调用了之后删除，不污染原来的对象
  delete that[symbol];
  return ret;
};
```

## myApply

```javascript
Function.prototype.myApply = function (that, params) {
  return this.myCall(that, ...params);
};
```

## myBind

实现上可能存在一点点问题，因为没有考虑 new 之后改变对象的指向什么的。后面有时间改改。

```javascript
Function.prototype.myBind = function (that, ...params) {
  let fn = this;
  return function (...ps) {
    return fn.myCall(that, ...params, ...ps);
  };
};
```
