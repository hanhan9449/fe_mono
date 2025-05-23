---
title: "实现一个 add 函数"
author: "hanhan.rich"
description: "实现一个 add 函数"
pubDate: "2021.04.02"
---

> https://runkit.com/hanhan9449/606698d60bf54200195d2d92

```javascript
console.log(6 == add(1, 2, 3)); // true
console.log("6" == add(1)(2)(3)); // true
```

第一次见这种题肯定很多朋友一脸问号。

其实这种题没什么意思。

首先我们思考一个函数可以被再次调用，因此这个函数返回的必定是一个函数。

`==`在比较的时候会发生类型转换，与字符串比较会调用`toString()`，与 number 比较会调用`valueOf()`。因此我们只需要实现`add`的`valueOf()`和`toString()`就行了。

那么问题来了，这个 add 是怎么实现的呢。 这里涉及到了闭包的知识了。我们利用一个闭包来保存算到的数，一个函数用到了不属于这个函数本身的变量，我们就称之为使用了闭包。

```javascript
function getAdder() {
  let count = 0;
  let add = function (...nums) {
    for (const n of nums) {
      count += n;
    }
    return add;
  };
  add.toString = function () {
    let ret = count;
    count = 0;
    return "" + ret;
  };
  add.valueOf = function () {
    let ret = count;
    count = 0;
    return ret;
  };
  return add;
}

let add = getAdder();

console.log(6 == add(1, 2, 3));
console.log("6" == add(1)(2)(3));
```
