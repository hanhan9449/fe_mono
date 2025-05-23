---
title: "实现 typeof"
author: "hanhan.rich"
description: "实现 typeof"
pubDate: "2021.04.02"
---

`typeof`在 js 中用于基本类型的判断。不能判断这个对象的原型是什么。

```javascript
// typeof的实现规范

let arr = [null, undefined, 1, false, "1", {}, [], new Date(), 1n, Symbol(), new (class Test {})(), function () {}];

// 实现我们自己的typeof

function typeOf(item) {
  return Object.prototype.toString.call(item).replace("[", "").replace("]", "").split(" ")[1].toLowerCase();
}

arr.forEach((v) => console.log(typeof v, typeOf(v)));
/*
object null
undefined undefined
number number
boolean boolean
string string
object object
object array
object date
bigint bigint
symbol symbol
object object
function function
 */
```

我们自己实现的 typeof 相对于原来的 typeof 更精确一点。可以用来判断对象的原型是什么。
